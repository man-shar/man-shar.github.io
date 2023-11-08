
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function claim_element(nodes, name, attributes, svg) {
        for (let i = 0; i < nodes.length; i += 1) {
            const node = nodes[i];
            if (node.nodeName === name) {
                let j = 0;
                const remove = [];
                while (j < node.attributes.length) {
                    const attribute = node.attributes[j++];
                    if (!attributes[attribute.name]) {
                        remove.push(attribute.name);
                    }
                }
                for (let k = 0; k < remove.length; k++) {
                    node.removeAttribute(remove[k]);
                }
                return nodes.splice(i, 1)[0];
            }
        }
        return svg ? svg_element(name) : element(name);
    }
    function claim_text(nodes, data) {
        for (let i = 0; i < nodes.length; i += 1) {
            const node = nodes[i];
            if (node.nodeType === 3) {
                node.data = '' + data;
                return nodes.splice(i, 1)[0];
            }
        }
        return text(data);
    }
    function claim_space(nodes) {
        return claim_text(nodes, ' ');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function claim_component(block, parent_nodes) {
        block && block.l(parent_nodes);
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.25.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const LOCATION = {};
    const ROUTER = {};

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    function getLocation(source) {
      return {
        ...source.location,
        state: source.history.state,
        key: (source.history.state && source.history.state.key) || "initial"
      };
    }

    function createHistory(source, options) {
      const listeners = [];
      let location = getLocation(source);

      return {
        get location() {
          return location;
        },

        listen(listener) {
          listeners.push(listener);

          const popstateListener = () => {
            location = getLocation(source);
            listener({ location, action: "POP" });
          };

          source.addEventListener("popstate", popstateListener);

          return () => {
            source.removeEventListener("popstate", popstateListener);

            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
          };
        },

        navigate(to, { state, replace = false } = {}) {
          state = { ...state, key: Date.now() + "" };
          // try...catch iOS Safari limits to 100 pushState calls
          try {
            if (replace) {
              source.history.replaceState(state, null, to);
            } else {
              source.history.pushState(state, null, to);
            }
          } catch (e) {
            source.location[replace ? "replace" : "assign"](to);
          }

          location = getLocation(source);
          listeners.forEach(listener => listener({ location, action: "PUSH" }));
        }
      };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
      let index = 0;
      const stack = [{ pathname: initialPathname, search: "" }];
      const states = [];

      return {
        get location() {
          return stack[index];
        },
        addEventListener(name, fn) {},
        removeEventListener(name, fn) {},
        history: {
          get entries() {
            return stack;
          },
          get index() {
            return index;
          },
          get state() {
            return states[index];
          },
          pushState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            index++;
            stack.push({ pathname, search });
            states.push(state);
          },
          replaceState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            stack[index] = { pathname, search };
            states[index] = state;
          }
        }
      };
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = Boolean(
      typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
    const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
    const { navigate } = globalHistory;

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    const paramRe = /^:(.+)/;

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Check if `string` starts with `search`
     * @param {string} string
     * @param {string} search
     * @return {boolean}
     */
    function startsWith(string, search) {
      return string.substr(0, search.length) === search;
    }

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    function isRootSegment(segment) {
      return segment === "";
    }

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    function isDynamic(segment) {
      return paramRe.test(segment);
    }

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    function isSplat(segment) {
      return segment[0] === "*";
    }

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri) {
      return (
        uri
          // Strip starting/ending `/`
          .replace(/(^\/+|\/+$)/g, "")
          .split("/")
      );
    }

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    function stripSlashes(str) {
      return str.replace(/(^\/+|\/+$)/g, "");
    }

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
      const score = route.default
        ? 0
        : segmentize(route.path).reduce((score, segment) => {
            score += SEGMENT_POINTS;

            if (isRootSegment(segment)) {
              score += ROOT_POINTS;
            } else if (isDynamic(segment)) {
              score += DYNAMIC_POINTS;
            } else if (isSplat(segment)) {
              score -= SEGMENT_POINTS + SPLAT_PENALTY;
            } else {
              score += STATIC_POINTS;
            }

            return score;
          }, 0);

      return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
      return (
        routes
          .map(rankRoute)
          // If two routes have the exact same score, we go by index instead
          .sort((a, b) =>
            a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
          )
      );
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { path, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
      let match;
      let default_;

      const [uriPathname] = uri.split("?");
      const uriSegments = segmentize(uriPathname);
      const isRootUri = uriSegments[0] === "";
      const ranked = rankRoutes(routes);

      for (let i = 0, l = ranked.length; i < l; i++) {
        const route = ranked[i].route;
        let missed = false;

        if (route.default) {
          default_ = {
            route,
            params: {},
            uri
          };
          continue;
        }

        const routeSegments = segmentize(route.path);
        const params = {};
        const max = Math.max(uriSegments.length, routeSegments.length);
        let index = 0;

        for (; index < max; index++) {
          const routeSegment = routeSegments[index];
          const uriSegment = uriSegments[index];

          if (routeSegment !== undefined && isSplat(routeSegment)) {
            // Hit a splat, just grab the rest, and return a match
            // uri:   /files/documents/work
            // route: /files/* or /files/*splatname
            const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

            params[splatName] = uriSegments
              .slice(index)
              .map(decodeURIComponent)
              .join("/");
            break;
          }

          if (uriSegment === undefined) {
            // URI is shorter than the route, no match
            // uri:   /users
            // route: /users/:userId
            missed = true;
            break;
          }

          let dynamicMatch = paramRe.exec(routeSegment);

          if (dynamicMatch && !isRootUri) {
            const value = decodeURIComponent(uriSegment);
            params[dynamicMatch[1]] = value;
          } else if (routeSegment !== uriSegment) {
            // Current segments don't match, not dynamic, not splat, so no match
            // uri:   /users/123/settings
            // route: /users/:id/profile
            missed = true;
            break;
          }
        }

        if (!missed) {
          match = {
            route,
            params,
            uri: "/" + uriSegments.slice(0, index).join("/")
          };
          break;
        }
      }

      return match || default_ || null;
    }

    /**
     * Check if the `path` matches the `uri`.
     * @param {string} path
     * @param {string} uri
     * @return {?object}
     */
    function match(route, uri) {
      return pick([route], uri);
    }

    /**
     * Add the query to the pathname if a query is given
     * @param {string} pathname
     * @param {string} [query]
     * @return {string}
     */
    function addQuery(pathname, query) {
      return pathname + (query ? `?${query}` : "");
    }

    /**
     * Resolve URIs as though every path is a directory, no files. Relative URIs
     * in the browser can feel awkward because not only can you be "in a directory",
     * you can be "at a file", too. For example:
     *
     *  browserSpecResolve('foo', '/bar/') => /bar/foo
     *  browserSpecResolve('foo', '/bar') => /foo
     *
     * But on the command line of a file system, it's not as complicated. You can't
     * `cd` from a file, only directories. This way, links have to know less about
     * their current path. To go deeper you can do this:
     *
     *  <Link to="deeper"/>
     *  // instead of
     *  <Link to=`{${props.uri}/deeper}`/>
     *
     * Just like `cd`, if you want to go deeper from the command line, you do this:
     *
     *  cd deeper
     *  # not
     *  cd $(pwd)/deeper
     *
     * By treating every path as a directory, linking to relative paths should
     * require less contextual information and (fingers crossed) be more intuitive.
     * @param {string} to
     * @param {string} base
     * @return {string}
     */
    function resolve(to, base) {
      // /foo/bar, /baz/qux => /foo/bar
      if (startsWith(to, "/")) {
        return to;
      }

      const [toPathname, toQuery] = to.split("?");
      const [basePathname] = base.split("?");
      const toSegments = segmentize(toPathname);
      const baseSegments = segmentize(basePathname);

      // ?a=b, /users?b=c => /users?a=b
      if (toSegments[0] === "") {
        return addQuery(basePathname, toQuery);
      }

      // profile, /users/789 => /users/789/profile
      if (!startsWith(toSegments[0], ".")) {
        const pathname = baseSegments.concat(toSegments).join("/");

        return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
      }

      // ./       , /users/123 => /users/123
      // ../      , /users/123 => /users
      // ../..    , /users/123 => /
      // ../../one, /a/b/c/d   => /a/b/one
      // .././one , /a/b/c/d   => /a/b/c/one
      const allSegments = baseSegments.concat(toSegments);
      const segments = [];

      allSegments.forEach(segment => {
        if (segment === "..") {
          segments.pop();
        } else if (segment !== ".") {
          segments.push(segment);
        }
      });

      return addQuery("/" + segments.join("/"), toQuery);
    }

    /**
     * Combines the `basepath` and the `path` into one path.
     * @param {string} basepath
     * @param {string} path
     */
    function combinePaths(basepath, path) {
      return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
    }

    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */
    function shouldNavigate(event) {
      return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
      );
    }

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.25.1 */

    function create_fragment$c(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			if (default_slot) default_slot.l(nodes);
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 32) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let $base;
    	let $location;
    	let $routes;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Router", slots, ['default']);
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	validate_store(routes, "routes");
    	component_subscribe($$self, routes, value => $$invalidate(10, $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    	// If locationContext is not set, this is the topmost Router in the tree.
    	// If the `url` prop is given we force the location to it.
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);

    	validate_store(location, "location");
    	component_subscribe($$self, location, value => $$invalidate(9, $location = value));

    	// If routerContext is set, the routerBase of the parent Router
    	// will be the base for this Router's descendants.
    	// If routerContext is not set, the path and resolved uri will both
    	// have the value of the basepath prop.
    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, "base");
    	component_subscribe($$self, base, value => $$invalidate(8, $base = value));

    	const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    		// If there is no activeRoute, the routerBase will be identical to the base.
    		if (activeRoute === null) {
    			return base;
    		}

    		const { path: basepath } = base;
    		const { route, uri } = activeRoute;

    		// Remove the potential /* or /*splatname from
    		// the end of the child Routes relative paths.
    		const path = route.default
    		? basepath
    		: route.path.replace(/\*.*$/, "");

    		return { path, uri };
    	});

    	function registerRoute(route) {
    		const { path: basepath } = $base;
    		let { path } = route;

    		// We store the original path in the _path property so we can reuse
    		// it when the basepath changes. The only thing that matters is that
    		// the route reference is intact, so mutation is fine.
    		route._path = path;

    		route.path = combinePaths(basepath, path);

    		if (typeof window === "undefined") {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match(route, $location.pathname);

    			if (matchingRoute) {
    				activeRoute.set(matchingRoute);
    				hasActiveRoute = true;
    			}
    		} else {
    			routes.update(rs => {
    				rs.push(route);
    				return rs;
    			});
    		}
    	}

    	function unregisterRoute(route) {
    		routes.update(rs => {
    			const index = rs.indexOf(route);
    			rs.splice(index, 1);
    			return rs;
    		});
    	}

    	if (!locationContext) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = globalHistory.listen(history => {
    				location.set(history.location);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute
    	});

    	const writable_props = ["basepath", "url"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("basepath" in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ("url" in $$props) $$invalidate(4, url = $$props.url);
    		if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		onMount,
    		writable,
    		derived,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		pick,
    		match,
    		stripSlashes,
    		combinePaths,
    		basepath,
    		url,
    		locationContext,
    		routerContext,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		location,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute,
    		$base,
    		$location,
    		$routes
    	});

    	$$self.$inject_state = $$props => {
    		if ("basepath" in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ("url" in $$props) $$invalidate(4, url = $$props.url);
    		if ("hasActiveRoute" in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$base*/ 256) {
    			// This reactive statement will update all the Routes' path when
    			// the basepath changes.
    			{
    				const { path: basepath } = $base;

    				routes.update(rs => {
    					rs.forEach(r => r.path = combinePaths(basepath, r._path));
    					return rs;
    				});
    			}
    		}

    		if ($$self.$$.dirty & /*$routes, $location*/ 1536) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			{
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}
    	};

    	return [routes, location, base, basepath, url, $$scope, slots];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.25.1 */

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*routeParams*/ 2,
    	location: dirty & /*$location*/ 16
    });

    const get_default_slot_context = ctx => ({
    	params: /*routeParams*/ ctx[1],
    	location: /*$location*/ ctx[4]
    });

    // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
    function create_if_block$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			if_block.l(nodes);
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {:else}
    function create_else_block$1(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			if (default_slot) default_slot.l(nodes);
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope, routeParams, $location*/ 530) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[9], dirty, get_default_slot_changes, get_default_slot_context);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(43:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#if component !== null}
    function create_if_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[4] },
    		/*routeParams*/ ctx[1],
    		/*routeProps*/ ctx[2]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		l: function claim(nodes) {
    			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$location, routeParams, routeProps*/ 22)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 16 && { location: /*$location*/ ctx[4] },
    					dirty & /*routeParams*/ 2 && get_spread_object(/*routeParams*/ ctx[1]),
    					dirty & /*routeProps*/ 4 && get_spread_object(/*routeProps*/ ctx[2])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(41:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[3] !== null && /*$activeRoute*/ ctx[3].route === /*route*/ ctx[7] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			if (if_block) if_block.l(nodes);
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$activeRoute*/ ctx[3] !== null && /*$activeRoute*/ ctx[3].route === /*route*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$activeRoute*/ 8) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Route", slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, "activeRoute");
    	component_subscribe($$self, activeRoute, value => $$invalidate(3, $activeRoute = value));
    	const location = getContext(LOCATION);
    	validate_store(location, "location");
    	component_subscribe($$self, location, value => $$invalidate(4, $location = value));

    	const route = {
    		path,
    		// If no path prop is given, this Route will act as the default Route
    		// that is rendered if no other Route in the Router is a match.
    		default: path === ""
    	};

    	let routeParams = {};
    	let routeProps = {};
    	registerRoute(route);

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway.
    	if (typeof window !== "undefined") {
    		onDestroy(() => {
    			unregisterRoute(route);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("path" in $$new_props) $$invalidate(8, path = $$new_props.path);
    		if ("component" in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ("$$scope" in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onDestroy,
    		ROUTER,
    		LOCATION,
    		path,
    		component,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		location,
    		route,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    		if ("path" in $$props) $$invalidate(8, path = $$new_props.path);
    		if ("component" in $$props) $$invalidate(0, component = $$new_props.component);
    		if ("routeParams" in $$props) $$invalidate(1, routeParams = $$new_props.routeParams);
    		if ("routeProps" in $$props) $$invalidate(2, routeProps = $$new_props.routeProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeRoute*/ 8) {
    			if ($activeRoute && $activeRoute.route === route) {
    				$$invalidate(1, routeParams = $activeRoute.params);
    			}
    		}

    		{
    			const { path, component, ...rest } = $$props;
    			$$invalidate(2, routeProps = rest);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location,
    		activeRoute,
    		location,
    		route,
    		path,
    		$$scope,
    		slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Link.svelte generated by Svelte v3.25.1 */
    const file$a = "node_modules/svelte-routing/src/Link.svelte";

    function create_fragment$a(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);

    	let a_levels = [
    		{ href: /*href*/ ctx[0] },
    		{ "aria-current": /*ariaCurrent*/ ctx[2] },
    		/*props*/ ctx[1]
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			this.h();
    		},
    		l: function claim(nodes) {
    			a = claim_element(nodes, "A", { href: true, "aria-current": true });
    			var a_nodes = children(a);
    			if (default_slot) default_slot.l(a_nodes);
    			a_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			set_attributes(a, a_data);
    			add_location(a, file$a, 40, 0, 1249);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*onClick*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 1024) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[10], dirty, null, null);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
    				(!current || dirty & /*ariaCurrent*/ 4) && { "aria-current": /*ariaCurrent*/ ctx[2] },
    				dirty & /*props*/ 2 && /*props*/ ctx[1]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let $base;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Link", slots, ['default']);
    	let { to = "#" } = $$props;
    	let { replace = false } = $$props;
    	let { state = {} } = $$props;
    	let { getProps = () => ({}) } = $$props;
    	const { base } = getContext(ROUTER);
    	validate_store(base, "base");
    	component_subscribe($$self, base, value => $$invalidate(14, $base = value));
    	const location = getContext(LOCATION);
    	validate_store(location, "location");
    	component_subscribe($$self, location, value => $$invalidate(15, $location = value));
    	const dispatch = createEventDispatcher();
    	let href, isPartiallyCurrent, isCurrent, props;

    	function onClick(event) {
    		dispatch("click", event);

    		if (shouldNavigate(event)) {
    			event.preventDefault();

    			// Don't push another entry to the history stack when the user
    			// clicks on a Link to the page they are currently on.
    			const shouldReplace = $location.pathname === href || replace;

    			navigate(href, { state, replace: shouldReplace });
    		}
    	}

    	const writable_props = ["to", "replace", "state", "getProps"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Link> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("to" in $$props) $$invalidate(6, to = $$props.to);
    		if ("replace" in $$props) $$invalidate(7, replace = $$props.replace);
    		if ("state" in $$props) $$invalidate(8, state = $$props.state);
    		if ("getProps" in $$props) $$invalidate(9, getProps = $$props.getProps);
    		if ("$$scope" in $$props) $$invalidate(10, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		createEventDispatcher,
    		ROUTER,
    		LOCATION,
    		navigate,
    		startsWith,
    		resolve,
    		shouldNavigate,
    		to,
    		replace,
    		state,
    		getProps,
    		base,
    		location,
    		dispatch,
    		href,
    		isPartiallyCurrent,
    		isCurrent,
    		props,
    		onClick,
    		$base,
    		$location,
    		ariaCurrent
    	});

    	$$self.$inject_state = $$props => {
    		if ("to" in $$props) $$invalidate(6, to = $$props.to);
    		if ("replace" in $$props) $$invalidate(7, replace = $$props.replace);
    		if ("state" in $$props) $$invalidate(8, state = $$props.state);
    		if ("getProps" in $$props) $$invalidate(9, getProps = $$props.getProps);
    		if ("href" in $$props) $$invalidate(0, href = $$props.href);
    		if ("isPartiallyCurrent" in $$props) $$invalidate(12, isPartiallyCurrent = $$props.isPartiallyCurrent);
    		if ("isCurrent" in $$props) $$invalidate(13, isCurrent = $$props.isCurrent);
    		if ("props" in $$props) $$invalidate(1, props = $$props.props);
    		if ("ariaCurrent" in $$props) $$invalidate(2, ariaCurrent = $$props.ariaCurrent);
    	};

    	let ariaCurrent;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*to, $base*/ 16448) {
    			$$invalidate(0, href = to === "/" ? $base.uri : resolve(to, $base.uri));
    		}

    		if ($$self.$$.dirty & /*$location, href*/ 32769) {
    			$$invalidate(12, isPartiallyCurrent = startsWith($location.pathname, href));
    		}

    		if ($$self.$$.dirty & /*href, $location*/ 32769) {
    			$$invalidate(13, isCurrent = href === $location.pathname);
    		}

    		if ($$self.$$.dirty & /*isCurrent*/ 8192) {
    			$$invalidate(2, ariaCurrent = isCurrent ? "page" : undefined);
    		}

    		if ($$self.$$.dirty & /*getProps, $location, href, isPartiallyCurrent, isCurrent*/ 45569) {
    			$$invalidate(1, props = getProps({
    				location: $location,
    				href,
    				isPartiallyCurrent,
    				isCurrent
    			}));
    		}
    	};

    	return [
    		href,
    		props,
    		ariaCurrent,
    		base,
    		location,
    		onClick,
    		to,
    		replace,
    		state,
    		getProps,
    		$$scope,
    		slots
    	];
    }

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { to: 6, replace: 7, state: 8, getProps: 9 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get to() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set to(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get replace() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set replace(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getProps() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set getProps(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/fa-svelte/src/Icon.svelte generated by Svelte v3.25.1 */

    const file$9 = "node_modules/fa-svelte/src/Icon.svelte";

    function create_fragment$9(ctx) {
    	let svg;
    	let path_1;
    	let svg_class_value;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path_1 = svg_element("path");
    			this.h();
    		},
    		l: function claim(nodes) {
    			svg = claim_element(
    				nodes,
    				"svg",
    				{
    					"aria-hidden": true,
    					class: true,
    					role: true,
    					xmlns: true,
    					viewBox: true
    				},
    				1
    			);

    			var svg_nodes = children(svg);
    			path_1 = claim_element(svg_nodes, "path", { fill: true, d: true }, 1);
    			children(path_1).forEach(detach_dev);
    			svg_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(path_1, "fill", "currentColor");
    			attr_dev(path_1, "d", /*path*/ ctx[0]);
    			add_location(path_1, file$9, 7, 2, 129);
    			attr_dev(svg, "aria-hidden", "true");
    			attr_dev(svg, "class", svg_class_value = "" + (null_to_empty(/*classes*/ ctx[1]) + " svelte-1d15yci"));
    			attr_dev(svg, "role", "img");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", /*viewBox*/ ctx[2]);
    			add_location(svg, file$9, 0, 0, 0);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path_1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*path*/ 1) {
    				attr_dev(path_1, "d", /*path*/ ctx[0]);
    			}

    			if (dirty & /*classes*/ 2 && svg_class_value !== (svg_class_value = "" + (null_to_empty(/*classes*/ ctx[1]) + " svelte-1d15yci"))) {
    				attr_dev(svg, "class", svg_class_value);
    			}

    			if (dirty & /*viewBox*/ 4) {
    				attr_dev(svg, "viewBox", /*viewBox*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Icon", slots, []);
    	let { icon } = $$props;
    	let path = [];
    	let classes = "";
    	let viewBox = "";

    	$$self.$$set = $$new_props => {
    		$$invalidate(4, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("icon" in $$new_props) $$invalidate(3, icon = $$new_props.icon);
    	};

    	$$self.$capture_state = () => ({ icon, path, classes, viewBox });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(4, $$props = assign(assign({}, $$props), $$new_props));
    		if ("icon" in $$props) $$invalidate(3, icon = $$new_props.icon);
    		if ("path" in $$props) $$invalidate(0, path = $$new_props.path);
    		if ("classes" in $$props) $$invalidate(1, classes = $$new_props.classes);
    		if ("viewBox" in $$props) $$invalidate(2, viewBox = $$new_props.viewBox);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*icon*/ 8) {
    			$$invalidate(2, viewBox = "0 0 " + icon.icon[0] + " " + icon.icon[1]);
    		}

    		$$invalidate(1, classes = "fa-svelte " + ($$props.class ? $$props.class : ""));

    		if ($$self.$$.dirty & /*icon*/ 8) {
    			$$invalidate(0, path = icon.icon[4]);
    		}
    	};

    	$$props = exclude_internal_props($$props);
    	return [path, classes, viewBox, icon];
    }

    class Icon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { icon: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon",
    			options,
    			id: create_fragment$9.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*icon*/ ctx[3] === undefined && !("icon" in props)) {
    			console.warn("<Icon> was created without expected prop 'icon'");
    		}
    	}

    	get icon() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function createCommonjsModule(fn, basedir, module) {
    	return module = {
    	  path: basedir,
    	  exports: {},
    	  require: function (path, base) {
          return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
        }
    	}, fn(module, module.exports), module.exports;
    }

    function commonjsRequire () {
    	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
    }

    var faTwitter = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    var prefix = 'fab';
    var iconName = 'twitter';
    var width = 512;
    var height = 512;
    var ligatures = [];
    var unicode = 'f099';
    var svgPathData = 'M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z';

    exports.definition = {
      prefix: prefix,
      iconName: iconName,
      icon: [
        width,
        height,
        ligatures,
        unicode,
        svgPathData
      ]};

    exports.faTwitter = exports.definition;
    exports.prefix = prefix;
    exports.iconName = iconName;
    exports.width = width;
    exports.height = height;
    exports.ligatures = ligatures;
    exports.unicode = unicode;
    exports.svgPathData = svgPathData;
    });

    var faTwitter$1 = faTwitter;

    var faGithub = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    var prefix = 'fab';
    var iconName = 'github';
    var width = 496;
    var height = 512;
    var ligatures = [];
    var unicode = 'f09b';
    var svgPathData = 'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z';

    exports.definition = {
      prefix: prefix,
      iconName: iconName,
      icon: [
        width,
        height,
        ligatures,
        unicode,
        svgPathData
      ]};

    exports.faGithub = exports.definition;
    exports.prefix = prefix;
    exports.iconName = iconName;
    exports.width = width;
    exports.height = height;
    exports.ligatures = ligatures;
    exports.unicode = unicode;
    exports.svgPathData = svgPathData;
    });

    var faGithub$1 = faGithub;

    var faEnvelope = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    var prefix = 'fas';
    var iconName = 'envelope';
    var width = 512;
    var height = 512;
    var ligatures = [];
    var unicode = 'f0e0';
    var svgPathData = 'M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z';

    exports.definition = {
      prefix: prefix,
      iconName: iconName,
      icon: [
        width,
        height,
        ligatures,
        unicode,
        svgPathData
      ]};

    exports.faEnvelope = exports.definition;
    exports.prefix = prefix;
    exports.iconName = iconName;
    exports.width = width;
    exports.height = height;
    exports.ligatures = ligatures;
    exports.unicode = unicode;
    exports.svgPathData = svgPathData;
    });

    var faEnvelope$1 = faEnvelope;

    /* src/Divider.svelte generated by Svelte v3.25.1 */
    const file$8 = "src/Divider.svelte";

    // (79:6) <Link to="/">
    function create_default_slot_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Published");
    		},
    		l: function claim(nodes) {
    			t = claim_text(nodes, "Published");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(79:6) <Link to=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (81:6) <Link to="about">
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("About");
    		},
    		l: function claim(nodes) {
    			t = claim_text(nodes, "About");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(81:6) <Link to=\\\"about\\\">",
    		ctx
    	});

    	return block;
    }

    // (77:2) <Router {url}>
    function create_default_slot$1(ctx) {
    	let div;
    	let link0;
    	let t0;
    	let span0;
    	let t1;
    	let link1;
    	let t2;
    	let span1;
    	let t3;
    	let a;
    	let t4;
    	let current;

    	link0 = new Link({
    			props: {
    				to: "/",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link1 = new Link({
    			props: {
    				to: "about",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(link0.$$.fragment);
    			t0 = space();
    			span0 = element("span");
    			t1 = space();
    			create_component(link1.$$.fragment);
    			t2 = space();
    			span1 = element("span");
    			t3 = space();
    			a = element("a");
    			t4 = text("c.v.");
    			this.h();
    		},
    		l: function claim(nodes) {
    			div = claim_element(nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			claim_component(link0.$$.fragment, div_nodes);
    			t0 = claim_space(div_nodes);
    			span0 = claim_element(div_nodes, "SPAN", { class: true });
    			children(span0).forEach(detach_dev);
    			t1 = claim_space(div_nodes);
    			claim_component(link1.$$.fragment, div_nodes);
    			t2 = claim_space(div_nodes);
    			span1 = claim_element(div_nodes, "SPAN", { class: true });
    			children(span1).forEach(detach_dev);
    			t3 = claim_space(div_nodes);
    			a = claim_element(div_nodes, "A", { class: true, title: true, href: true });
    			var a_nodes = children(a);
    			t4 = claim_text(a_nodes, "c.v.");
    			a_nodes.forEach(detach_dev);
    			div_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(span0, "class", "divide svelte-1pdawov");
    			add_location(span0, file$8, 79, 6, 1701);
    			attr_dev(span1, "class", "divide svelte-1pdawov");
    			add_location(span1, file$8, 81, 6, 1767);
    			attr_dev(a, "class", "");
    			attr_dev(a, "title", "Resume");
    			attr_dev(a, "href", "assets/resume.pdf");
    			add_location(a, file$8, 82, 6, 1797);
    			attr_dev(div, "class", "flex-left svelte-1pdawov");
    			add_location(div, file$8, 77, 4, 1635);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(link0, div, null);
    			append_dev(div, t0);
    			append_dev(div, span0);
    			append_dev(div, t1);
    			mount_component(link1, div, null);
    			append_dev(div, t2);
    			append_dev(div, span1);
    			append_dev(div, t3);
    			append_dev(div, a);
    			append_dev(a, t4);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const link0_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link0_changes.$$scope = { dirty, ctx };
    			}

    			link0.$set(link0_changes);
    			const link1_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link1_changes.$$scope = { dirty, ctx };
    			}

    			link1.$set(link1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link0.$$.fragment, local);
    			transition_in(link1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link0.$$.fragment, local);
    			transition_out(link1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(link0);
    			destroy_component(link1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(77:2) <Router {url}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div1;
    	let router;
    	let t0;
    	let div0;
    	let a0;
    	let icon0;
    	let t1;
    	let a1;
    	let icon1;
    	let t2;
    	let a2;
    	let icon2;
    	let current;

    	router = new Router({
    			props: {
    				url: /*url*/ ctx[0],
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	icon0 = new Icon({
    			props: { icon: faGithub$1.faGithub },
    			$$inline: true
    		});

    	icon1 = new Icon({
    			props: { icon: faTwitter$1.faTwitter },
    			$$inline: true
    		});

    	icon2 = new Icon({
    			props: { icon: faEnvelope$1.faEnvelope },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(router.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			a0 = element("a");
    			create_component(icon0.$$.fragment);
    			t1 = space();
    			a1 = element("a");
    			create_component(icon1.$$.fragment);
    			t2 = space();
    			a2 = element("a");
    			create_component(icon2.$$.fragment);
    			this.h();
    		},
    		l: function claim(nodes) {
    			div1 = claim_element(nodes, "DIV", { id: true, class: true });
    			var div1_nodes = children(div1);
    			claim_component(router.$$.fragment, div1_nodes);
    			t0 = claim_space(div1_nodes);
    			div0 = claim_element(div1_nodes, "DIV", { class: true });
    			var div0_nodes = children(div0);

    			a0 = claim_element(div0_nodes, "A", {
    				class: true,
    				title: true,
    				target: true,
    				href: true
    			});

    			var a0_nodes = children(a0);
    			claim_component(icon0.$$.fragment, a0_nodes);
    			a0_nodes.forEach(detach_dev);
    			t1 = claim_space(div0_nodes);

    			a1 = claim_element(div0_nodes, "A", {
    				class: true,
    				title: true,
    				target: true,
    				href: true
    			});

    			var a1_nodes = children(a1);
    			claim_component(icon1.$$.fragment, a1_nodes);
    			a1_nodes.forEach(detach_dev);
    			t2 = claim_space(div0_nodes);

    			a2 = claim_element(div0_nodes, "A", {
    				class: true,
    				title: true,
    				target: true,
    				href: true
    			});

    			var a2_nodes = children(a2);
    			claim_component(icon2.$$.fragment, a2_nodes);
    			a2_nodes.forEach(detach_dev);
    			div0_nodes.forEach(detach_dev);
    			div1_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(a0, "class", "icon icon-logo");
    			attr_dev(a0, "title", "Github");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "href", "https://github.com/man-shar");
    			add_location(a0, file$8, 90, 4, 2007);
    			attr_dev(a1, "class", "icon icon-logo");
    			attr_dev(a1, "title", "Twitter");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "href", "https://twitter.com/manshar_");
    			add_location(a1, file$8, 95, 4, 2156);
    			attr_dev(a2, "class", "icon icon-logo");
    			attr_dev(a2, "title", "Email");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "href", "mailto:manasdotsharma@gmail.com");
    			add_location(a2, file$8, 100, 4, 2308);
    			attr_dev(div0, "class", "flex-right svelte-1pdawov");
    			add_location(div0, file$8, 89, 2, 1978);
    			attr_dev(div1, "id", "divider");
    			attr_dev(div1, "class", "svelte-1pdawov");
    			add_location(div1, file$8, 75, 0, 1595);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(router, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, a0);
    			mount_component(icon0, a0, null);
    			append_dev(div0, t1);
    			append_dev(div0, a1);
    			mount_component(icon1, a1, null);
    			append_dev(div0, t2);
    			append_dev(div0, a2);
    			mount_component(icon2, a2, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};
    			if (dirty & /*url*/ 1) router_changes.url = /*url*/ ctx[0];

    			if (dirty & /*$$scope*/ 2) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			transition_in(icon0.$$.fragment, local);
    			transition_in(icon1.$$.fragment, local);
    			transition_in(icon2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			transition_out(icon0.$$.fragment, local);
    			transition_out(icon1.$$.fragment, local);
    			transition_out(icon2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(router);
    			destroy_component(icon0);
    			destroy_component(icon1);
    			destroy_component(icon2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Divider", slots, []);
    	let { url = "" } = $$props;
    	const writable_props = ["url"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Divider> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("url" in $$props) $$invalidate(0, url = $$props.url);
    	};

    	$$self.$capture_state = () => ({
    		Router,
    		Link,
    		Icon,
    		faTwitter: faTwitter$1.faTwitter,
    		faGithub: faGithub$1.faGithub,
    		faEnvelope: faEnvelope$1.faEnvelope,
    		url
    	});

    	$$self.$inject_state = $$props => {
    		if ("url" in $$props) $$invalidate(0, url = $$props.url);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [url];
    }

    class Divider extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { url: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Divider",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get url() {
    		throw new Error("<Divider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Divider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Photo.svelte generated by Svelte v3.25.1 */

    const file$7 = "src/Photo.svelte";

    // (26:2) {:else}
    function create_else_block(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			this.h();
    		},
    		l: function claim(nodes) {
    			img = claim_element(nodes, "IMG", { class: true, src: true, alt: true });
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(img, "class", "h-100");
    			if (img.src !== (img_src_value = "assets/" + /*path*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "kn");
    			add_location(img, file$7, 25, 9, 584);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*path*/ 1 && img.src !== (img_src_value = "assets/" + /*path*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(26:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (22:2) {#if path && path.indexOf('mp4') !== -1}
    function create_if_block(ctx) {
    	let video;
    	let source;
    	let source_src_value;

    	const block = {
    		c: function create() {
    			video = element("video");
    			source = element("source");
    			this.h();
    		},
    		l: function claim(nodes) {
    			video = claim_element(nodes, "VIDEO", {
    				class: true,
    				autoplay: true,
    				loop: true,
    				muted: true,
    				playsinline: true
    			});

    			var video_nodes = children(video);
    			source = claim_element(video_nodes, "SOURCE", { src: true });
    			video_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			if (source.src !== (source_src_value = "assets/" + /*path*/ ctx[0])) attr_dev(source, "src", source_src_value);
    			add_location(source, file$7, 23, 6, 531);
    			attr_dev(video, "class", "h-100");
    			video.autoplay = true;
    			video.loop = true;
    			video.muted = true;
    			video.playsInline = true;
    			add_location(video, file$7, 22, 4, 471);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, video, anchor);
    			append_dev(video, source);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*path*/ 1 && source.src !== (source_src_value = "assets/" + /*path*/ ctx[0])) {
    				attr_dev(source, "src", source_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(video);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(22:2) {#if path && path.indexOf('mp4') !== -1}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div;
    	let show_if;

    	function select_block_type(ctx, dirty) {
    		if (show_if == null || dirty & /*path*/ 1) show_if = !!(/*path*/ ctx[0] && /*path*/ ctx[0].indexOf("mp4") !== -1);
    		if (show_if) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx, -1);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			this.h();
    		},
    		l: function claim(nodes) {
    			div = claim_element(nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			if_block.l(div_nodes);
    			div_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(div, "class", "project-image svelte-1usd5um");
    			add_location(div, file$7, 18, 0, 347);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_block.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Photo", slots, []);
    	let { path } = $$props;
    	const writable_props = ["path"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Photo> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("path" in $$props) $$invalidate(0, path = $$props.path);
    	};

    	$$self.$capture_state = () => ({ path });

    	$$self.$inject_state = $$props => {
    		if ("path" in $$props) $$invalidate(0, path = $$props.path);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [path];
    }

    class Photo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { path: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Photo",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*path*/ ctx[0] === undefined && !("path" in props)) {
    			console.warn("<Photo> was created without expected prop 'path'");
    		}
    	}

    	get path() {
    		throw new Error("<Photo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Photo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Name.svelte generated by Svelte v3.25.1 */

    const file$6 = "src/Name.svelte";

    function create_fragment$6(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			this.h();
    		},
    		l: function claim(nodes) {
    			div = claim_element(nodes, "DIV", {});
    			var div_nodes = children(div);
    			div_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			add_location(div, file$6, 7, 0, 57);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			div.innerHTML = /*name*/ ctx[0];
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1) div.innerHTML = /*name*/ ctx[0];		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Name", slots, []);
    	let { name } = $$props;
    	const writable_props = ["name"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Name> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({ name });

    	$$self.$inject_state = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name];
    }

    class Name extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { name: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Name",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !("name" in props)) {
    			console.warn("<Name> was created without expected prop 'name'");
    		}
    	}

    	get name() {
    		throw new Error("<Name>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Name>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Project.svelte generated by Svelte v3.25.1 */
    const file$5 = "src/Project.svelte";

    function create_fragment$5(ctx) {
    	let a;
    	let div;
    	let photo;
    	let t;
    	let name;
    	let div_id_value;
    	let a_href_value;
    	let current;

    	photo = new Photo({
    			props: { path: /*project*/ ctx[0].img },
    			$$inline: true
    		});

    	name = new Name({
    			props: { name: /*project*/ ctx[0].name },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			a = element("a");
    			div = element("div");
    			create_component(photo.$$.fragment);
    			t = space();
    			create_component(name.$$.fragment);
    			this.h();
    		},
    		l: function claim(nodes) {
    			a = claim_element(nodes, "A", { target: true, href: true, class: true });
    			var a_nodes = children(a);
    			div = claim_element(a_nodes, "DIV", { class: true, id: true });
    			var div_nodes = children(div);
    			claim_component(photo.$$.fragment, div_nodes);
    			t = claim_space(div_nodes);
    			claim_component(name.$$.fragment, div_nodes);
    			div_nodes.forEach(detach_dev);
    			a_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(div, "class", "project svelte-n66dlj");
    			attr_dev(div, "id", div_id_value = /*project*/ ctx[0].img.split(".")[0]);
    			add_location(div, file$5, 45, 2, 773);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "href", a_href_value = /*project*/ ctx[0].link);
    			attr_dev(a, "class", "svelte-n66dlj");
    			add_location(a, file$5, 44, 0, 731);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, div);
    			mount_component(photo, div, null);
    			append_dev(div, t);
    			mount_component(name, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const photo_changes = {};
    			if (dirty & /*project*/ 1) photo_changes.path = /*project*/ ctx[0].img;
    			photo.$set(photo_changes);
    			const name_changes = {};
    			if (dirty & /*project*/ 1) name_changes.name = /*project*/ ctx[0].name;
    			name.$set(name_changes);

    			if (!current || dirty & /*project*/ 1 && div_id_value !== (div_id_value = /*project*/ ctx[0].img.split(".")[0])) {
    				attr_dev(div, "id", div_id_value);
    			}

    			if (!current || dirty & /*project*/ 1 && a_href_value !== (a_href_value = /*project*/ ctx[0].link)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(photo.$$.fragment, local);
    			transition_in(name.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(photo.$$.fragment, local);
    			transition_out(name.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			destroy_component(photo);
    			destroy_component(name);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Project", slots, []);
    	let { project } = $$props;
    	const writable_props = ["project"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Project> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("project" in $$props) $$invalidate(0, project = $$props.project);
    	};

    	$$self.$capture_state = () => ({ project, Photo, Name });

    	$$self.$inject_state = $$props => {
    		if ("project" in $$props) $$invalidate(0, project = $$props.project);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [project];
    }

    class Project extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { project: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Project",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*project*/ ctx[0] === undefined && !("project" in props)) {
    			console.warn("<Project> was created without expected prop 'project'");
    		}
    	}

    	get project() {
    		throw new Error("<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set project(value) {
    		throw new Error("<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Projects.svelte generated by Svelte v3.25.1 */
    const file$4 = "src/Projects.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (17:2) {#each projects as project}
    function create_each_block$1(ctx) {
    	let project;
    	let current;

    	project = new Project({
    			props: { project: /*project*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(project.$$.fragment);
    		},
    		l: function claim(nodes) {
    			claim_component(project.$$.fragment, nodes);
    		},
    		m: function mount(target, anchor) {
    			mount_component(project, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const project_changes = {};
    			if (dirty & /*projects*/ 1) project_changes.project = /*project*/ ctx[1];
    			project.$set(project_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(project.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(project.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(project, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(17:2) {#each projects as project}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div;
    	let current;
    	let each_value = /*projects*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			this.h();
    		},
    		l: function claim(nodes) {
    			div = claim_element(nodes, "DIV", { id: true, class: true });
    			var div_nodes = children(div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].l(div_nodes);
    			}

    			div_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(div, "id", "projects-container");
    			attr_dev(div, "class", "svelte-1qg77cl");
    			add_location(div, file$4, 15, 0, 246);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*projects*/ 1) {
    				each_value = /*projects*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Projects", slots, []);
    	let { projects } = $$props;
    	const writable_props = ["projects"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("projects" in $$props) $$invalidate(0, projects = $$props.projects);
    	};

    	$$self.$capture_state = () => ({ projects, Project });

    	$$self.$inject_state = $$props => {
    		if ("projects" in $$props) $$invalidate(0, projects = $$props.projects);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [projects];
    }

    class Projects extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { projects: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*projects*/ ctx[0] === undefined && !("projects" in props)) {
    			console.warn("<Projects> was created without expected prop 'projects'");
    		}
    	}

    	get projects() {
    		throw new Error("<Projects>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set projects(value) {
    		throw new Error("<Projects>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Award.svelte generated by Svelte v3.25.1 */

    const file$3 = "src/Award.svelte";

    function create_fragment$3(ctx) {
    	let a1;
    	let div;
    	let h4;

    	let t0_value = (/*showEvent*/ ctx[1]
    	? /*award*/ ctx[0].event + " | "
    	: "") + "";

    	let t0;
    	let t1_value = /*award*/ ctx[0].year + "";
    	let t1;
    	let t2;
    	let t3_value = /*award*/ ctx[0].award + "";
    	let t3;
    	let t4;
    	let a0;
    	let t5_value = /*award*/ ctx[0].project_name + "";
    	let t5;
    	let a0_href_value;
    	let a1_href_value;

    	const block = {
    		c: function create() {
    			a1 = element("a");
    			div = element("div");
    			h4 = element("h4");
    			t0 = text(t0_value);
    			t1 = text(t1_value);
    			t2 = text(" | ");
    			t3 = text(t3_value);
    			t4 = space();
    			a0 = element("a");
    			t5 = text(t5_value);
    			this.h();
    		},
    		l: function claim(nodes) {
    			a1 = claim_element(nodes, "A", { target: true, href: true });
    			var a1_nodes = children(a1);
    			div = claim_element(a1_nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			h4 = claim_element(div_nodes, "H4", { class: true });
    			var h4_nodes = children(h4);
    			t0 = claim_text(h4_nodes, t0_value);
    			t1 = claim_text(h4_nodes, t1_value);
    			t2 = claim_text(h4_nodes, " | ");
    			t3 = claim_text(h4_nodes, t3_value);
    			h4_nodes.forEach(detach_dev);
    			t4 = claim_space(div_nodes);
    			a0 = claim_element(div_nodes, "A", { class: true, href: true });
    			var a0_nodes = children(a0);
    			t5 = claim_text(a0_nodes, t5_value);
    			a0_nodes.forEach(detach_dev);
    			div_nodes.forEach(detach_dev);
    			a1_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(h4, "class", "dark-gray svelte-1er5w7x");
    			add_location(h4, file$3, 25, 4, 343);
    			attr_dev(a0, "class", "link svelte-1er5w7x");
    			attr_dev(a0, "href", a0_href_value = /*award*/ ctx[0].project_link);
    			add_location(a0, file$3, 26, 4, 443);
    			attr_dev(div, "class", "award-box svelte-1er5w7x");
    			add_location(div, file$3, 24, 2, 315);
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "href", a1_href_value = /*award*/ ctx[0].link);
    			add_location(a1, file$3, 23, 0, 275);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a1, anchor);
    			append_dev(a1, div);
    			append_dev(div, h4);
    			append_dev(h4, t0);
    			append_dev(h4, t1);
    			append_dev(h4, t2);
    			append_dev(h4, t3);
    			append_dev(div, t4);
    			append_dev(div, a0);
    			append_dev(a0, t5);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*showEvent, award*/ 3 && t0_value !== (t0_value = (/*showEvent*/ ctx[1]
    			? /*award*/ ctx[0].event + " | "
    			: "") + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*award*/ 1 && t1_value !== (t1_value = /*award*/ ctx[0].year + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*award*/ 1 && t3_value !== (t3_value = /*award*/ ctx[0].award + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*award*/ 1 && t5_value !== (t5_value = /*award*/ ctx[0].project_name + "")) set_data_dev(t5, t5_value);

    			if (dirty & /*award*/ 1 && a0_href_value !== (a0_href_value = /*award*/ ctx[0].project_link)) {
    				attr_dev(a0, "href", a0_href_value);
    			}

    			if (dirty & /*award*/ 1 && a1_href_value !== (a1_href_value = /*award*/ ctx[0].link)) {
    				attr_dev(a1, "href", a1_href_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Award", slots, []);
    	let { award } = $$props;
    	let { showEvent } = $$props;
    	const writable_props = ["award", "showEvent"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Award> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("award" in $$props) $$invalidate(0, award = $$props.award);
    		if ("showEvent" in $$props) $$invalidate(1, showEvent = $$props.showEvent);
    	};

    	$$self.$capture_state = () => ({ award, showEvent });

    	$$self.$inject_state = $$props => {
    		if ("award" in $$props) $$invalidate(0, award = $$props.award);
    		if ("showEvent" in $$props) $$invalidate(1, showEvent = $$props.showEvent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [award, showEvent];
    }

    class Award extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { award: 0, showEvent: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Award",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*award*/ ctx[0] === undefined && !("award" in props)) {
    			console.warn("<Award> was created without expected prop 'award'");
    		}

    		if (/*showEvent*/ ctx[1] === undefined && !("showEvent" in props)) {
    			console.warn("<Award> was created without expected prop 'showEvent'");
    		}
    	}

    	get award() {
    		throw new Error("<Award>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set award(value) {
    		throw new Error("<Award>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showEvent() {
    		throw new Error("<Award>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showEvent(value) {
    		throw new Error("<Award>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var awards = [
    	{
    		event: "Sigma Awards",
    		year: 2021,
    		award: "Citation",
    		project_name: "Individual portfolio",
    		project_link: "https://sigmaawards.org/manas-sharma-portfolio/"
    	},
    	{
    		event: "SND",
    		year: 2020,
    		award: "Silver: Page design",
    		project_name: "COVID 19: Herd immunity - Stopping the spread",
    		project_link: "https://graphics.reuters.com/HEALTH-CORONAVIRUS/HERD%20IMMUNITY%20(EXPLAINER)/gjnvwayydvw/"
    	},
    	{
    		event: "SND",
    		year: 2020,
    		award: "Award of excellence",
    		project_name: "Individual portfolio"
    	},
    	{
    		event: "Malofiej",
    		year: 2021,
    		award: "Gold",
    		project_name: "Shifting smoke",
    		project_link: "https://graphics.reuters.com/USA-WILDFIRE/POLLUTION/xlbpgjgervq/"
    	},
    	{
    		event: "Malofiej",
    		year: 2021,
    		award: "Silver",
    		project_name: "California fires coverage"
    	},
    	{
    		event: "Malofiej",
    		year: 2021,
    		award: "Bronze",
    		project_name: "California fires: Air attack",
    		project_link: "https://graphics.reuters.com/CALIFORNIA-WILDFIRE/AIRCRAFT/bdwpkzmyyvm/index.html"
    	},
    	{
    		event: "Malofiej",
    		year: 2021,
    		award: "Silver",
    		project_name: "COVID 19: Herd immunity - Stopping the spread",
    		project_link: "https://graphics.reuters.com/HEALTH-CORONAVIRUS/HERD%20IMMUNITY%20(EXPLAINER)/gjnvwayydvw/"
    	},
    	{
    		event: "Malofiej",
    		year: 2021,
    		award: "Bronze",
    		project_name: "Australia bushfires: Scale",
    		project_link: "https://graphics.reuters.com/AUSTRALIA-BUSHFIRES-SCALE/0100B4VK2PN/index.html"
    	},
    	{
    		event: "Malofiej",
    		year: 2021,
    		award: "Bronze",
    		project_name: "A deluge of death in northern Italy",
    		project_link: "https://graphics.reuters.com/HEALTH-CORONAVIRUS-LOMBARDY/0100B5LT46P/index.html"
    	},
    	{
    		event: "Malofiej",
    		year: 2020,
    		award: "Bronze",
    		project_name: "Australia bushfires: State of emergency",
    		project_link: "https://graphics.reuters.com/AUSTRALIA-BUSHFIRES/0100B30H252/index.html"
    	}
    ];

    /* src/About.svelte generated by Svelte v3.25.1 */
    const file$2 = "src/About.svelte";

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (74:6) {#each awards.filter((d) => d.project_name.indexOf("portfolio") >= 0) as award}
    function create_each_block_2(ctx) {
    	let award;
    	let current;

    	award = new Award({
    			props: { award: /*award*/ ctx[4], showEvent: true },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(award.$$.fragment);
    		},
    		l: function claim(nodes) {
    			claim_component(award.$$.fragment, nodes);
    		},
    		m: function mount(target, anchor) {
    			mount_component(award, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(award.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(award.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(award, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(74:6) {#each awards.filter((d) => d.project_name.indexOf(\\\"portfolio\\\") >= 0) as award}",
    		ctx
    	});

    	return block;
    }

    // (83:8) {#each awards.filter((d) => d.event === event && d.project_name.indexOf("portfolio") === -1) as award}
    function create_each_block_1(ctx) {
    	let award;
    	let current;

    	award = new Award({
    			props: { award: /*award*/ ctx[4] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(award.$$.fragment);
    		},
    		l: function claim(nodes) {
    			claim_component(award.$$.fragment, nodes);
    		},
    		m: function mount(target, anchor) {
    			mount_component(award, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(award.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(award.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(award, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(83:8) {#each awards.filter((d) => d.event === event && d.project_name.indexOf(\\\"portfolio\\\") === -1) as award}",
    		ctx
    	});

    	return block;
    }

    // (80:4) {#each ["SND", "Malofiej"] as event}
    function create_each_block(ctx) {
    	let div;
    	let h4;
    	let t0;
    	let t1;
    	let t2;
    	let current;

    	function func_1(...args) {
    		return /*func_1*/ ctx[0](/*event*/ ctx[1], ...args);
    	}

    	let each_value_1 = awards.filter(func_1);
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");
    			h4 = element("h4");
    			t0 = text(/*event*/ ctx[1]);
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			this.h();
    		},
    		l: function claim(nodes) {
    			div = claim_element(nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			h4 = claim_element(div_nodes, "H4", { class: true });
    			var h4_nodes = children(h4);
    			t0 = claim_text(h4_nodes, /*event*/ ctx[1]);
    			h4_nodes.forEach(detach_dev);
    			t1 = claim_space(div_nodes);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].l(div_nodes);
    			}

    			t2 = claim_space(div_nodes);
    			div_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(h4, "class", "event-name " + /*event*/ ctx[1] + " svelte-7bql16");
    			add_location(h4, file$2, 81, 8, 2662);
    			attr_dev(div, "class", "event-box svelte-7bql16");
    			add_location(div, file$2, 80, 6, 2630);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h4);
    			append_dev(h4, t0);
    			append_dev(div, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t2);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*awards*/ 0) {
    				each_value_1 = awards.filter(func_1);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, t2);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(80:4) {#each [\\\"SND\\\", \\\"Malofiej\\\"] as event}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div4;
    	let p0;
    	let t0;
    	let t1;
    	let p1;
    	let t2;
    	let t3;
    	let p2;
    	let t4;
    	let t5;
    	let p3;
    	let t6;
    	let t7;
    	let div0;
    	let t8;
    	let p4;
    	let span;
    	let t9;
    	let t10;
    	let p5;
    	let t11;
    	let t12;
    	let p6;
    	let t13;
    	let t14;
    	let p7;
    	let a0;
    	let t15;
    	let t16;
    	let a1;
    	let t17;
    	let t18;
    	let a2;
    	let t19;
    	let t20;
    	let a3;
    	let t21;
    	let t22;
    	let a4;
    	let t23;
    	let t24;
    	let a5;
    	let t25;
    	let t26;
    	let a6;
    	let t27;
    	let t28;
    	let a7;
    	let t29;
    	let t30;
    	let a8;
    	let t31;
    	let t32;
    	let a9;
    	let t33;
    	let t34;
    	let a10;
    	let t35;
    	let t36;
    	let a11;
    	let t37;
    	let t38;
    	let p8;
    	let t39;
    	let t40;
    	let div1;
    	let t41;
    	let div3;
    	let h2;
    	let t42;
    	let t43;
    	let h30;
    	let t44;
    	let t45;
    	let div2;
    	let t46;
    	let h31;
    	let t47;
    	let t48;
    	let current;
    	let each_value_2 = awards.filter(func);
    	validate_each_argument(each_value_2);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
    		each_blocks_1[i] = null;
    	});

    	let each_value = ["SND", "Malofiej"];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < 2; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out_1 = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			p0 = element("p");
    			t0 = text("I was born and raised in the city of Lucknow, Uttar Pradesh.");
    			t1 = space();
    			p1 = element("p");
    			t2 = text("As foreign as my hometown feels now, its tenderness is hopefully still a\n    part of me. The softer tones and mannerisms are perhaps gone, but I have\n    tried to carry with me the way of treating others.");
    			t3 = space();
    			p2 = element("p");
    			t4 = text("If you ever visit – and you should – do it in the winter. It's quiet and\n    slow and foggy and beautiful.");
    			t5 = space();
    			p3 = element("p");
    			t6 = text("I currently live in Bangalore.");
    			t7 = space();
    			div0 = element("div");
    			t8 = space();
    			p4 = element("p");
    			span = element("span");
    			t9 = text("\"If I have seen further, it is by standing on the shoulders of giants\"");
    			t10 = space();
    			p5 = element("p");
    			t11 = text("I've had the immense fortune of learning from the most talented and\n    supportive people in the industry.");
    			t12 = space();
    			p6 = element("p");
    			t13 = text("An incomplete list of people who have always – knowingly or unknowingly –\n    given me more kindness than I have deserved:");
    			t14 = space();
    			p7 = element("p");
    			a0 = element("a");
    			t15 = text("Simon Scarr");
    			t16 = text(" |\n    ");
    			a1 = element("a");
    			t17 = text("Monica Ulmanu");
    			t18 = text("\n    | ");
    			a2 = element("a");
    			t19 = text("Jon McClure");
    			t20 = text(" |\n    ");
    			a3 = element("a");
    			t21 = text("Matthew Weber");
    			t22 = text("\n    | Jennifer T. |\n    ");
    			a4 = element("a");
    			t23 = text("Gurman Bhatia");
    			t24 = text("\n    |\n    ");
    			a5 = element("a");
    			t25 = text("Anand Katakam");
    			t26 = text("\n    |\n    ");
    			a6 = element("a");
    			t27 = text("Rishabh Srivastava");
    			t28 = text("\n    |\n    ");
    			a7 = element("a");
    			t29 = text("Harry Stevens");
    			t30 = text("\n    | ");
    			a8 = element("a");
    			t31 = text("Tim Meko");
    			t32 = text(" |\n    ");
    			a9 = element("a");
    			t33 = text("Bonnie Berkowitz");
    			t34 = text("\n    |\n    ");
    			a10 = element("a");
    			t35 = text("Chiqui Esteban");
    			t36 = text("\n    |\n    ");
    			a11 = element("a");
    			t37 = text("Prof. Venkatesh Rajamanickam");
    			t38 = space();
    			p8 = element("p");
    			t39 = text("I'm forever in their debt.");
    			t40 = space();
    			div1 = element("div");
    			t41 = space();
    			div3 = element("div");
    			h2 = element("h2");
    			t42 = text("Accolades");
    			t43 = space();
    			h30 = element("h3");
    			t44 = text("Individual recognition");
    			t45 = space();
    			div2 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t46 = space();
    			h31 = element("h3");
    			t47 = text("Awards for projects I've been a part of");
    			t48 = space();

    			for (let i = 0; i < 2; i += 1) {
    				each_blocks[i].c();
    			}

    			this.h();
    		},
    		l: function claim(nodes) {
    			div4 = claim_element(nodes, "DIV", { id: true, class: true });
    			var div4_nodes = children(div4);
    			p0 = claim_element(div4_nodes, "P", {});
    			var p0_nodes = children(p0);
    			t0 = claim_text(p0_nodes, "I was born and raised in the city of Lucknow, Uttar Pradesh.");
    			p0_nodes.forEach(detach_dev);
    			t1 = claim_space(div4_nodes);
    			p1 = claim_element(div4_nodes, "P", {});
    			var p1_nodes = children(p1);
    			t2 = claim_text(p1_nodes, "As foreign as my hometown feels now, its tenderness is hopefully still a\n    part of me. The softer tones and mannerisms are perhaps gone, but I have\n    tried to carry with me the way of treating others.");
    			p1_nodes.forEach(detach_dev);
    			t3 = claim_space(div4_nodes);
    			p2 = claim_element(div4_nodes, "P", {});
    			var p2_nodes = children(p2);
    			t4 = claim_text(p2_nodes, "If you ever visit – and you should – do it in the winter. It's quiet and\n    slow and foggy and beautiful.");
    			p2_nodes.forEach(detach_dev);
    			t5 = claim_space(div4_nodes);
    			p3 = claim_element(div4_nodes, "P", {});
    			var p3_nodes = children(p3);
    			t6 = claim_text(p3_nodes, "I currently live in Bangalore.");
    			p3_nodes.forEach(detach_dev);
    			t7 = claim_space(div4_nodes);
    			div0 = claim_element(div4_nodes, "DIV", { class: true });
    			children(div0).forEach(detach_dev);
    			t8 = claim_space(div4_nodes);
    			p4 = claim_element(div4_nodes, "P", { class: true });
    			var p4_nodes = children(p4);
    			span = claim_element(p4_nodes, "SPAN", { class: true });
    			var span_nodes = children(span);
    			t9 = claim_text(span_nodes, "\"If I have seen further, it is by standing on the shoulders of giants\"");
    			span_nodes.forEach(detach_dev);
    			p4_nodes.forEach(detach_dev);
    			t10 = claim_space(div4_nodes);
    			p5 = claim_element(div4_nodes, "P", {});
    			var p5_nodes = children(p5);
    			t11 = claim_text(p5_nodes, "I've had the immense fortune of learning from the most talented and\n    supportive people in the industry.");
    			p5_nodes.forEach(detach_dev);
    			t12 = claim_space(div4_nodes);
    			p6 = claim_element(div4_nodes, "P", {});
    			var p6_nodes = children(p6);
    			t13 = claim_text(p6_nodes, "An incomplete list of people who have always – knowingly or unknowingly –\n    given me more kindness than I have deserved:");
    			p6_nodes.forEach(detach_dev);
    			t14 = claim_space(div4_nodes);
    			p7 = claim_element(div4_nodes, "P", { class: true });
    			var p7_nodes = children(p7);
    			a0 = claim_element(p7_nodes, "A", { class: true, href: true });
    			var a0_nodes = children(a0);
    			t15 = claim_text(a0_nodes, "Simon Scarr");
    			a0_nodes.forEach(detach_dev);
    			t16 = claim_text(p7_nodes, " |\n    ");
    			a1 = claim_element(p7_nodes, "A", { class: true, href: true });
    			var a1_nodes = children(a1);
    			t17 = claim_text(a1_nodes, "Monica Ulmanu");
    			a1_nodes.forEach(detach_dev);
    			t18 = claim_text(p7_nodes, "\n    | ");
    			a2 = claim_element(p7_nodes, "A", { class: true, href: true });
    			var a2_nodes = children(a2);
    			t19 = claim_text(a2_nodes, "Jon McClure");
    			a2_nodes.forEach(detach_dev);
    			t20 = claim_text(p7_nodes, " |\n    ");
    			a3 = claim_element(p7_nodes, "A", { class: true, href: true });
    			var a3_nodes = children(a3);
    			t21 = claim_text(a3_nodes, "Matthew Weber");
    			a3_nodes.forEach(detach_dev);
    			t22 = claim_text(p7_nodes, "\n    | Jennifer T. |\n    ");
    			a4 = claim_element(p7_nodes, "A", { class: true, href: true });
    			var a4_nodes = children(a4);
    			t23 = claim_text(a4_nodes, "Gurman Bhatia");
    			a4_nodes.forEach(detach_dev);
    			t24 = claim_text(p7_nodes, "\n    |\n    ");
    			a5 = claim_element(p7_nodes, "A", { class: true, href: true });
    			var a5_nodes = children(a5);
    			t25 = claim_text(a5_nodes, "Anand Katakam");
    			a5_nodes.forEach(detach_dev);
    			t26 = claim_text(p7_nodes, "\n    |\n    ");
    			a6 = claim_element(p7_nodes, "A", { class: true, href: true });
    			var a6_nodes = children(a6);
    			t27 = claim_text(a6_nodes, "Rishabh Srivastava");
    			a6_nodes.forEach(detach_dev);
    			t28 = claim_text(p7_nodes, "\n    |\n    ");
    			a7 = claim_element(p7_nodes, "A", { class: true, href: true });
    			var a7_nodes = children(a7);
    			t29 = claim_text(a7_nodes, "Harry Stevens");
    			a7_nodes.forEach(detach_dev);
    			t30 = claim_text(p7_nodes, "\n    | ");
    			a8 = claim_element(p7_nodes, "A", { class: true, href: true });
    			var a8_nodes = children(a8);
    			t31 = claim_text(a8_nodes, "Tim Meko");
    			a8_nodes.forEach(detach_dev);
    			t32 = claim_text(p7_nodes, " |\n    ");
    			a9 = claim_element(p7_nodes, "A", { class: true, href: true });
    			var a9_nodes = children(a9);
    			t33 = claim_text(a9_nodes, "Bonnie Berkowitz");
    			a9_nodes.forEach(detach_dev);
    			t34 = claim_text(p7_nodes, "\n    |\n    ");
    			a10 = claim_element(p7_nodes, "A", { class: true, href: true });
    			var a10_nodes = children(a10);
    			t35 = claim_text(a10_nodes, "Chiqui Esteban");
    			a10_nodes.forEach(detach_dev);
    			t36 = claim_text(p7_nodes, "\n    |\n    ");
    			a11 = claim_element(p7_nodes, "A", { class: true, href: true });
    			var a11_nodes = children(a11);
    			t37 = claim_text(a11_nodes, "Prof. Venkatesh Rajamanickam");
    			a11_nodes.forEach(detach_dev);
    			p7_nodes.forEach(detach_dev);
    			t38 = claim_space(div4_nodes);
    			p8 = claim_element(div4_nodes, "P", {});
    			var p8_nodes = children(p8);
    			t39 = claim_text(p8_nodes, "I'm forever in their debt.");
    			p8_nodes.forEach(detach_dev);
    			t40 = claim_space(div4_nodes);
    			div1 = claim_element(div4_nodes, "DIV", { class: true });
    			children(div1).forEach(detach_dev);
    			t41 = claim_space(div4_nodes);
    			div3 = claim_element(div4_nodes, "DIV", { id: true, class: true });
    			var div3_nodes = children(div3);
    			h2 = claim_element(div3_nodes, "H2", { class: true });
    			var h2_nodes = children(h2);
    			t42 = claim_text(h2_nodes, "Accolades");
    			h2_nodes.forEach(detach_dev);
    			t43 = claim_space(div3_nodes);
    			h30 = claim_element(div3_nodes, "H3", { class: true });
    			var h30_nodes = children(h30);
    			t44 = claim_text(h30_nodes, "Individual recognition");
    			h30_nodes.forEach(detach_dev);
    			t45 = claim_space(div3_nodes);
    			div2 = claim_element(div3_nodes, "DIV", { class: true });
    			var div2_nodes = children(div2);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].l(div2_nodes);
    			}

    			div2_nodes.forEach(detach_dev);
    			t46 = claim_space(div3_nodes);
    			h31 = claim_element(div3_nodes, "H3", { class: true });
    			var h31_nodes = children(h31);
    			t47 = claim_text(h31_nodes, "Awards for projects I've been a part of");
    			h31_nodes.forEach(detach_dev);
    			t48 = claim_space(div3_nodes);

    			for (let i = 0; i < 2; i += 1) {
    				each_blocks[i].l(div3_nodes);
    			}

    			div3_nodes.forEach(detach_dev);
    			div4_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			add_location(p0, file$2, 6, 2, 125);
    			add_location(p1, file$2, 7, 2, 195);
    			add_location(p2, file$2, 12, 2, 417);
    			add_location(p3, file$2, 16, 2, 541);
    			attr_dev(div0, "class", "line svelte-7bql16");
    			add_location(div0, file$2, 18, 2, 582);
    			attr_dev(span, "class", "italic gray svelte-7bql16");
    			add_location(span, file$2, 21, 4, 628);
    			attr_dev(p4, "class", "quote svelte-7bql16");
    			add_location(p4, file$2, 20, 2, 606);
    			add_location(p5, file$2, 25, 2, 753);
    			add_location(p6, file$2, 29, 2, 877);
    			attr_dev(a0, "class", "person svelte-7bql16");
    			attr_dev(a0, "href", "https://twitter.com/SimonScarr");
    			add_location(a0, file$2, 34, 4, 1050);
    			attr_dev(a1, "class", "person svelte-7bql16");
    			attr_dev(a1, "href", "https://twitter.com/monicaulmanu");
    			add_location(a1, file$2, 35, 4, 1128);
    			attr_dev(a2, "class", "person svelte-7bql16");
    			attr_dev(a2, "href", "https://twitter.com/JonRMcClure");
    			add_location(a2, file$2, 36, 6, 1210);
    			attr_dev(a3, "class", "person svelte-7bql16");
    			attr_dev(a3, "href", "https://www.linkedin.com/in/matthew-weber-343ba4111/");
    			add_location(a3, file$2, 37, 4, 1289);
    			attr_dev(a4, "class", "person svelte-7bql16");
    			attr_dev(a4, "href", "https://twitter.com/GurmanBhatia");
    			add_location(a4, file$2, 43, 4, 1433);
    			attr_dev(a5, "class", "person svelte-7bql16");
    			attr_dev(a5, "href", "https://twitter.com/anandkatakam");
    			add_location(a5, file$2, 45, 4, 1519);
    			attr_dev(a6, "class", "person svelte-7bql16");
    			attr_dev(a6, "href", "https://twitter.com/rishdotblog");
    			add_location(a6, file$2, 47, 4, 1605);
    			attr_dev(a7, "class", "person svelte-7bql16");
    			attr_dev(a7, "href", "https://twitter.com/Harry_Stevens");
    			add_location(a7, file$2, 51, 4, 1707);
    			attr_dev(a8, "class", "person svelte-7bql16");
    			attr_dev(a8, "href", "https://twitter.com/timmeko");
    			add_location(a8, file$2, 52, 6, 1790);
    			attr_dev(a9, "class", "person svelte-7bql16");
    			attr_dev(a9, "href", "https://twitter.com/bonnieberkowitz");
    			add_location(a9, file$2, 53, 4, 1862);
    			attr_dev(a10, "class", "person svelte-7bql16");
    			attr_dev(a10, "href", "https://twitter.com/chiquiesteban");
    			add_location(a10, file$2, 57, 4, 1966);
    			attr_dev(a11, "class", "person svelte-7bql16");
    			attr_dev(a11, "href", "http://www.idc.iitb.ac.in/venkat/index.html");
    			add_location(a11, file$2, 60, 4, 2059);
    			attr_dev(p7, "class", "person-container svelte-7bql16");
    			add_location(p7, file$2, 33, 2, 1017);
    			add_location(p8, file$2, 65, 2, 2183);
    			attr_dev(div1, "class", "line svelte-7bql16");
    			add_location(div1, file$2, 67, 2, 2220);
    			attr_dev(h2, "class", "svelte-7bql16");
    			add_location(h2, file$2, 70, 4, 2279);
    			attr_dev(h30, "class", "svelte-7bql16");
    			add_location(h30, file$2, 71, 4, 2302);
    			attr_dev(div2, "class", "event-box svelte-7bql16");
    			add_location(div2, file$2, 72, 4, 2338);
    			attr_dev(h31, "class", "mt-5 svelte-7bql16");
    			add_location(h31, file$2, 78, 4, 2521);
    			attr_dev(div3, "id", "accolades-container");
    			attr_dev(div3, "class", "svelte-7bql16");
    			add_location(div3, file$2, 69, 2, 2244);
    			attr_dev(div4, "id", "about-container");
    			attr_dev(div4, "class", "svelte-7bql16");
    			add_location(div4, file$2, 5, 0, 96);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, p0);
    			append_dev(p0, t0);
    			append_dev(div4, t1);
    			append_dev(div4, p1);
    			append_dev(p1, t2);
    			append_dev(div4, t3);
    			append_dev(div4, p2);
    			append_dev(p2, t4);
    			append_dev(div4, t5);
    			append_dev(div4, p3);
    			append_dev(p3, t6);
    			append_dev(div4, t7);
    			append_dev(div4, div0);
    			append_dev(div4, t8);
    			append_dev(div4, p4);
    			append_dev(p4, span);
    			append_dev(span, t9);
    			append_dev(div4, t10);
    			append_dev(div4, p5);
    			append_dev(p5, t11);
    			append_dev(div4, t12);
    			append_dev(div4, p6);
    			append_dev(p6, t13);
    			append_dev(div4, t14);
    			append_dev(div4, p7);
    			append_dev(p7, a0);
    			append_dev(a0, t15);
    			append_dev(p7, t16);
    			append_dev(p7, a1);
    			append_dev(a1, t17);
    			append_dev(p7, t18);
    			append_dev(p7, a2);
    			append_dev(a2, t19);
    			append_dev(p7, t20);
    			append_dev(p7, a3);
    			append_dev(a3, t21);
    			append_dev(p7, t22);
    			append_dev(p7, a4);
    			append_dev(a4, t23);
    			append_dev(p7, t24);
    			append_dev(p7, a5);
    			append_dev(a5, t25);
    			append_dev(p7, t26);
    			append_dev(p7, a6);
    			append_dev(a6, t27);
    			append_dev(p7, t28);
    			append_dev(p7, a7);
    			append_dev(a7, t29);
    			append_dev(p7, t30);
    			append_dev(p7, a8);
    			append_dev(a8, t31);
    			append_dev(p7, t32);
    			append_dev(p7, a9);
    			append_dev(a9, t33);
    			append_dev(p7, t34);
    			append_dev(p7, a10);
    			append_dev(a10, t35);
    			append_dev(p7, t36);
    			append_dev(p7, a11);
    			append_dev(a11, t37);
    			append_dev(div4, t38);
    			append_dev(div4, p8);
    			append_dev(p8, t39);
    			append_dev(div4, t40);
    			append_dev(div4, div1);
    			append_dev(div4, t41);
    			append_dev(div4, div3);
    			append_dev(div3, h2);
    			append_dev(h2, t42);
    			append_dev(div3, t43);
    			append_dev(div3, h30);
    			append_dev(h30, t44);
    			append_dev(div3, t45);
    			append_dev(div3, div2);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div2, null);
    			}

    			append_dev(div3, t46);
    			append_dev(div3, h31);
    			append_dev(h31, t47);
    			append_dev(div3, t48);

    			for (let i = 0; i < 2; i += 1) {
    				each_blocks[i].m(div3, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*awards*/ 0) {
    				each_value_2 = awards.filter(func);
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    						transition_in(each_blocks_1[i], 1);
    					} else {
    						each_blocks_1[i] = create_each_block_2(child_ctx);
    						each_blocks_1[i].c();
    						transition_in(each_blocks_1[i], 1);
    						each_blocks_1[i].m(div2, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_2.length; i < each_blocks_1.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (dirty & /*awards*/ 0) {
    				each_value = ["SND", "Malofiej"];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < 2; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div3, null);
    					}
    				}

    				group_outros();

    				for (i = 2; i < 2; i += 1) {
    					out_1(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			for (let i = 0; i < 2; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks_1 = each_blocks_1.filter(Boolean);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < 2; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func = d => d.project_name.indexOf("portfolio") >= 0;

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("About", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	const func_1 = (event, d) => d.event === event && d.project_name.indexOf("portfolio") === -1;
    	$$self.$capture_state = () => ({ Award, awards });
    	return [func_1];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/Resume.svelte generated by Svelte v3.25.1 */

    const file$1 = "src/Resume.svelte";

    function create_fragment$1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			this.h();
    		},
    		l: function claim(nodes) {
    			div = claim_element(nodes, "DIV", { id: true });
    			children(div).forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(div, "id", "resume-container");
    			add_location(div, file$1, 6, 0, 38);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Resume", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Resume> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Resume extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Resume",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.25.1 */
    const file = "src/App.svelte";

    // (32:6) <Route path="/">
    function create_default_slot_1(ctx) {
    	let projects_1;
    	let current;

    	projects_1 = new Projects({
    			props: { projects: /*projects*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(projects_1.$$.fragment);
    		},
    		l: function claim(nodes) {
    			claim_component(projects_1.$$.fragment, nodes);
    		},
    		m: function mount(target, anchor) {
    			mount_component(projects_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const projects_1_changes = {};
    			if (dirty & /*projects*/ 2) projects_1_changes.projects = /*projects*/ ctx[1];
    			projects_1.$set(projects_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(projects_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(projects_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(projects_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(32:6) <Route path=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (28:2) <Router {url}>
    function create_default_slot(ctx) {
    	let div;
    	let route0;
    	let t0;
    	let route1;
    	let t1;
    	let route2;
    	let current;

    	route0 = new Route({
    			props: { path: "about", component: About },
    			$$inline: true
    		});

    	route1 = new Route({
    			props: { path: "resume", component: Resume },
    			$$inline: true
    		});

    	route2 = new Route({
    			props: {
    				path: "/",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(route0.$$.fragment);
    			t0 = space();
    			create_component(route1.$$.fragment);
    			t1 = space();
    			create_component(route2.$$.fragment);
    			this.h();
    		},
    		l: function claim(nodes) {
    			div = claim_element(nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			claim_component(route0.$$.fragment, div_nodes);
    			t0 = claim_space(div_nodes);
    			claim_component(route1.$$.fragment, div_nodes);
    			t1 = claim_space(div_nodes);
    			claim_component(route2.$$.fragment, div_nodes);
    			div_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(div, "class", "page-container svelte-zpszh1");
    			add_location(div, file, 28, 4, 789);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(route0, div, null);
    			append_dev(div, t0);
    			mount_component(route1, div, null);
    			append_dev(div, t1);
    			mount_component(route2, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const route2_changes = {};

    			if (dirty & /*$$scope, projects*/ 10) {
    				route2_changes.$$scope = { dirty, ctx };
    			}

    			route2.$set(route2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(route0);
    			destroy_component(route1);
    			destroy_component(route2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(28:2) <Router {url}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let div1;
    	let h1;
    	let t0;
    	let t1;
    	let div0;
    	let p0;
    	let t2;
    	let a0;
    	let t3;
    	let t4;
    	let p1;
    	let span;
    	let t5;
    	let t6;
    	let a1;
    	let t7;
    	let t8;
    	let a2;
    	let t9;
    	let t10;
    	let t11;
    	let divider;
    	let t12;
    	let router;
    	let current;
    	divider = new Divider({ $$inline: true });

    	router = new Router({
    			props: {
    				url: /*url*/ ctx[2],
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			div1 = element("div");
    			h1 = element("h1");
    			t0 = text(/*name*/ ctx[0]);
    			t1 = space();
    			div0 = element("div");
    			p0 = element("p");
    			t2 = text("Currently @");
    			a0 = element("a");
    			t3 = text("defog.ai");
    			t4 = space();
    			p1 = element("p");
    			span = element("span");
    			t5 = text("Past");
    			t6 = text(": News gfx at\n        ");
    			a1 = element("a");
    			t7 = text("Reuters");
    			t8 = text("\n        |\n        ");
    			a2 = element("a");
    			t9 = text("WaPo");
    			t10 = text(" | HT");
    			t11 = space();
    			create_component(divider.$$.fragment);
    			t12 = space();
    			create_component(router.$$.fragment);
    			this.h();
    		},
    		l: function claim(nodes) {
    			main = claim_element(nodes, "MAIN", { class: true });
    			var main_nodes = children(main);
    			div1 = claim_element(main_nodes, "DIV", { id: true, class: true });
    			var div1_nodes = children(div1);
    			h1 = claim_element(div1_nodes, "H1", { class: true });
    			var h1_nodes = children(h1);
    			t0 = claim_text(h1_nodes, /*name*/ ctx[0]);
    			h1_nodes.forEach(detach_dev);
    			t1 = claim_space(div1_nodes);
    			div0 = claim_element(div1_nodes, "DIV", { class: true });
    			var div0_nodes = children(div0);
    			p0 = claim_element(div0_nodes, "P", { class: true });
    			var p0_nodes = children(p0);
    			t2 = claim_text(p0_nodes, "Currently @");
    			a0 = claim_element(p0_nodes, "A", { target: true, href: true, class: true });
    			var a0_nodes = children(a0);
    			t3 = claim_text(a0_nodes, "defog.ai");
    			a0_nodes.forEach(detach_dev);
    			p0_nodes.forEach(detach_dev);
    			t4 = claim_space(div0_nodes);
    			p1 = claim_element(div0_nodes, "P", { class: true });
    			var p1_nodes = children(p1);
    			span = claim_element(p1_nodes, "SPAN", { class: true });
    			var span_nodes = children(span);
    			t5 = claim_text(span_nodes, "Past");
    			span_nodes.forEach(detach_dev);
    			t6 = claim_text(p1_nodes, ": News gfx at\n        ");
    			a1 = claim_element(p1_nodes, "A", { target: true, href: true, class: true });
    			var a1_nodes = children(a1);
    			t7 = claim_text(a1_nodes, "Reuters");
    			a1_nodes.forEach(detach_dev);
    			t8 = claim_text(p1_nodes, "\n        |\n        ");
    			a2 = claim_element(p1_nodes, "A", { target: true, href: true, class: true });
    			var a2_nodes = children(a2);
    			t9 = claim_text(a2_nodes, "WaPo");
    			a2_nodes.forEach(detach_dev);
    			t10 = claim_text(p1_nodes, " | HT");
    			p1_nodes.forEach(detach_dev);
    			div0_nodes.forEach(detach_dev);
    			t11 = claim_space(div1_nodes);
    			claim_component(divider.$$.fragment, div1_nodes);
    			div1_nodes.forEach(detach_dev);
    			t12 = claim_space(main_nodes);
    			claim_component(router.$$.fragment, main_nodes);
    			main_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(h1, "class", "svelte-zpszh1");
    			add_location(h1, file, 13, 4, 327);
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "href", "https://defog.ai/");
    			attr_dev(a0, "class", "svelte-zpszh1");
    			add_location(a0, file, 16, 19, 411);
    			attr_dev(p0, "class", "current svelte-zpszh1");
    			add_location(p0, file, 15, 6, 372);
    			attr_dev(span, "class", "");
    			add_location(span, file, 19, 8, 510);
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "href", "https://www.reuters.com/graphics/");
    			attr_dev(a1, "class", "svelte-zpszh1");
    			add_location(a1, file, 20, 8, 558);
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "href", "https://twitter.com/PostGraphics");
    			attr_dev(a2, "class", "svelte-zpszh1");
    			add_location(a2, file, 22, 8, 648);
    			attr_dev(p1, "class", "past svelte-zpszh1");
    			add_location(p1, file, 18, 6, 485);
    			attr_dev(div0, "class", "jobs");
    			add_location(div0, file, 14, 4, 347);
    			attr_dev(div1, "id", "top");
    			attr_dev(div1, "class", "svelte-zpszh1");
    			add_location(div1, file, 12, 2, 308);
    			attr_dev(main, "class", "svelte-zpszh1");
    			add_location(main, file, 11, 0, 299);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div1);
    			append_dev(div1, h1);
    			append_dev(h1, t0);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, p0);
    			append_dev(p0, t2);
    			append_dev(p0, a0);
    			append_dev(a0, t3);
    			append_dev(div0, t4);
    			append_dev(div0, p1);
    			append_dev(p1, span);
    			append_dev(span, t5);
    			append_dev(p1, t6);
    			append_dev(p1, a1);
    			append_dev(a1, t7);
    			append_dev(p1, t8);
    			append_dev(p1, a2);
    			append_dev(a2, t9);
    			append_dev(p1, t10);
    			append_dev(div1, t11);
    			mount_component(divider, div1, null);
    			append_dev(main, t12);
    			mount_component(router, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*name*/ 1) set_data_dev(t0, /*name*/ ctx[0]);
    			const router_changes = {};
    			if (dirty & /*url*/ 4) router_changes.url = /*url*/ ctx[2];

    			if (dirty & /*$$scope, projects*/ 10) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(divider.$$.fragment, local);
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(divider.$$.fragment, local);
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(divider);
    			destroy_component(router);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let { name } = $$props;
    	let { projects } = $$props;
    	let { url = "" } = $$props;
    	const writable_props = ["name", "projects", "url"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    		if ("projects" in $$props) $$invalidate(1, projects = $$props.projects);
    		if ("url" in $$props) $$invalidate(2, url = $$props.url);
    	};

    	$$self.$capture_state = () => ({
    		name,
    		projects,
    		Router,
    		Route,
    		Divider,
    		Projects,
    		About,
    		Resume,
    		url
    	});

    	$$self.$inject_state = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    		if ("projects" in $$props) $$invalidate(1, projects = $$props.projects);
    		if ("url" in $$props) $$invalidate(2, url = $$props.url);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, projects, url];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { name: 0, projects: 1, url: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !("name" in props)) {
    			console.warn("<App> was created without expected prop 'name'");
    		}

    		if (/*projects*/ ctx[1] === undefined && !("projects" in props)) {
    			console.warn("<App> was created without expected prop 'projects'");
    		}
    	}

    	get name() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get projects() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set projects(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var projects = [
    	{
    		name: "Why Arctic fires are releasing more carbon than ever",
    		link: "https://graphics.reuters.com/CLIMATE-CHANGE/WILDFIRE-EMISSIONS/zjvqkrwmnvx/index.html",
    		year: 2022,
    		img: "arctic.jpg"
    	},
    	{
    		name: "The record lightning storm during the Tonga volcanic eruption",
    		link: "https://graphics.reuters.com/TONGA-VOLCANO/LIGHTNING/zgpomjdbypd/index.html",
    		year: 2022,
    		img: "tonga.mp4"
    	},
    	{
    		name: "How herd immunity works",
    		link: "https://graphics.reuters.com/HEALTH-CORONAVIRUS/HERD%20IMMUNITY%20(EXPLAINER)/gjnvwayydvw/index.html",
    		year: 2020,
    		img: "herd.mp4"
    	},
    	{
    		name: "The age of the \"megafire\" </br> Analysing a century's worth of fire data",
    		link: "https://graphics.reuters.com/USA-WILDFIRES/EXTREMES/qzjvqmmravx/",
    		year: 2021,
    		img: "megafires.mp4"
    	},
    	{
    		name: "Singapore's COVID-19 explosion",
    		link: "https://graphics.reuters.com/HEALTH-CORONAVIRUS/SINGAPORE-CLUSTERS/bdwpkdgngvm/index.html",
    		year: 2020,
    		img: "singapore.mp4"
    	},
    	{
    		name: "Devoured: How China’s largest freshwater lake was decimated by sand mining",
    		link: "https://graphics.reuters.com/GLOBAL-ENVIRONMENT/SAND-POYANG/qzjpqxxabvx/index.html",
    		year: 2021,
    		img: "devoured.mp4"
    	},
    	{
    		name: "How CalFire's aircraft work in tandem to stop blazes",
    		link: "https://graphics.reuters.com/CALIFORNIA-WILDFIRE/AIRCRAFT/bdwpkzmyyvm/index.html",
    		year: 2020,
    		img: "air-attack.mp4"
    	},
    	{
    		name: "Assessing Australia's bushfires impact on wildlife",
    		link: "https://graphics.reuters.com/AUSTRALIA-BUSHFIRES-WILDLIFE/0100B5672VM/index.html",
    		year: 2020,
    		img: "wildlife.mp4"
    	},
    	{
    		name: "Shifting smoke: California's wildfires",
    		link: "https://graphics.reuters.com/USA-WILDFIRE/POLLUTION/xlbpgjgervq/index.html",
    		year: 2020,
    		img: "cali-smoke.mp4"
    	},
    	{
    		name: "A day of COVID-19 deaths",
    		link: "http://graphics.reuters.com/HEALTH-CORONAVIRUS/DEATHS/xlbpgobgapq/index.html",
    		year: 2020,
    		img: "clocks.mp4"
    	},
    	{
    		name: "How big were Australia's bushfires?",
    		link: "https://graphics.reuters.com/AUSTRALIA-BUSHFIRES-SCALE/0100B4VK2PN/index.html",
    		year: 2020,
    		img: "aus-scale.jpg"
    	},
    	{
    		name: "The risks of swiftly spreading coronavirus research",
    		link: "https://graphics.reuters.com/CHINA-HEALTH-RESEARCH/0100B5ES3MG/index.html",
    		year: 2020,
    		img: "speed-science.jpg"
    	},
    	{
    		name: "Forests in flames: Australia’s bushfires from space",
    		link: "https://graphics.reuters.com/AUSTRALIA-BUSHFIRES-SATELLITEIMAGES/0100B4R62H1/index.html",
    		year: 2019,
    		img: "aus-satellite.jpg"
    	},
    	{
    		name: "Pollution in India: The world's worst air",
    		link: "https://graphics.reuters.com/INDIA-POLLUTION-MAP/0100B30824L/index.html",
    		year: 2019,
    		img: "india-pollution.mp4"
    	},
    	{
    		name: "Dangerous heights: Deaths on the Himalayas",
    		link: "https://tmsnrt.rs/2r5hOS3",
    		year: 2019,
    		img: "himalayas.mp4"
    	},
    	{
    		name: "Wikipedia wars: Hong Kong’s online frontline",
    		link: "https://graphics.reuters.com/HONGKONG-PROTESTS-WIKIPEDIA/0100B33629V/index.html",
    		year: 2019,
    		img: "hk-wiki.mp4"
    	},
    	{
    		name: "How big were the Hong Kong protests?",
    		link: "https://graphics.reuters.com/HONGKONG-EXTRADITION-CROWDSIZE/0100B05W0BE/index.html",
    		year: 2019,
    		img: "head-count.mp4"
    	},
    	{
    		name: "Sounds and slogans from the Hong Kong protests",
    		link: "https://graphics.reuters.com/HONGKONG-EXTRADITION-SIGNS/0100B0630BZ/index.html",
    		year: 2019,
    		img: "hk-signs.jpg"
    	},
    	{
    		name: "How India mobilised a million polling stations ",
    		link: "https://graphics.reuters.com/INDIA-ELECTION-STATIONS/010092FY33Z/index.html",
    		year: 2019,
    		img: "india-polling.jpg"
    	},
    	{
    		name: "What are baseball players' favourite cliches?",
    		link: "https://www.washingtonpost.com/graphics/2018/sports/baseball-cliches/",
    		year: 2018,
    		img: "baseball.png"
    	},
    	{
    		name: "Rising communal hate crimes in India",
    		link: "https://www.washingtonpost.com/graphics/2018/world/reports-of-hate-crime-cases-have-spiked-in-india/",
    		year: 2018,
    		img: "india-hate.gif"
    	},
    	{
    		name: "How big is Delhi's dowry \"bazaar\"?",
    		link: "https://www.hindustantimes.com/interactives/delhi-dowry-bazaar/",
    		year: 2017,
    		img: "dowry.png"
    	},
    	{
    		name: "Looking at grade inflation by a national board of education in India",
    		link: "https://www.hindustantimes.com/interactives/cbse-results-2017-marks-inflation-decade/",
    		year: 2017,
    		img: "cbse.mp4"
    	},
    	{
    		name: "A brief history of the US Open",
    		link: "https://www.hindustantimes.com/interactives/a-brief-history-of-the-us-open/",
    		year: 2017,
    		img: "us-open.png"
    	},
    	{
    		name: "Graphic design movements throughout history",
    		link: "https://man-shar.github.io/Graphic-Design-Movements-Streamgraph/GraphicDesignStream.html",
    		year: 2017,
    		img: "graphic.png"
    	},
    	{
    		name: "How society shaped Bollywood through the past century",
    		link: "https://man-shar.github.io/BollyBlues/bolly.html",
    		year: 2017,
    		img: "bolly.png"
    	}
    ];

    const app = new App({
      target: document.body,
      props: {
        name: "Manas Sharma",
        projects: projects,
      },
      hydrate: true,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
