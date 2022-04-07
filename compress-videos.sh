ffmpeg -i ./project-files/videos-compressed/cali-smoke.mp4 -an ./docs/assets/cali-smoke.mp4
ffmpeg -i ./project-files/videos-compressed/cbse.mp4 -an ./docs/assets/cbse.mp4
ffmpeg -i ./project-files/videos-compressed/clocks.mp4 -an ./docs/assets/clocks.mp4
ffmpeg -i ./project-files/videos-compressed/head-count.mp4 -an ./docs/assets/head-count.mp4
ffmpeg -i ./project-files/videos-compressed/herd.mp4 -an ./docs/assets/herd.mp4
ffmpeg -i ./project-files/videos-compressed/himalayas.mp4 -an ./docs/assets/himalayas.mp4
ffmpeg -i ./project-files/videos-compressed/hk-wiki.mp4 -an ./docs/assets/hk-wiki.mp4
ffmpeg -i ./project-files/videos-compressed/india-pollution.mp4 -an ./docs/assets/india-pollution.mp4
ffmpeg -i ./project-files/videos-compressed/singapore.mp4 -an ./docs/assets/singapore.mp4
ffmpeg -i ./project-files/videos-compressed/wildlife.mp4 -an ./docs/assets/wildlife.mp4

ffmpeg -i ./project-files/devoured-trimmed.mov -c:v libx264 -filter:v scale="512:-1" -an -movflags +faststart ./docs/assets/devoured.mp4
ffmpeg -i ./project-files/megafire-trimmed.mov -c:v libx264 -filter:v scale="512:-1" -an -movflags +faststart ./docs/assets/megafires.mp4
ffmpeg -i ./project-files/air-attack-trimmed.mov -c:v libx264 -filter:v scale="512:-1" -an -movflags +faststart ./docs/assets/air-attack.mp4
ffmpeg -i ./project-files/tonga.gif -c:v libx264 -filter:v scale="512:-1" -an -movflags +faststart ./docs/assets/tonga.mp4
