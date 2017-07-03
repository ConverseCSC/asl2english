# Convert Quicktime movie files to MPEG-4 files, regardless of file extension.
# Using Python 3 (3.5.2 is what shows)

import os
import subprocess
from pathlib import Path

def main():
    srcdir = 'videos-qt'
    dstdir = 'videos'

    appledoubles = 0
    quicktimes = 0
    others = 0
    for entry in os.scandir(srcdir):
        if entry.is_file():
            #print(entry.name)
            filetype = subprocess.run(['file', entry.path],
                                      universal_newlines=True,
                                      stdout=subprocess.PIPE)
            filetype = filetype.stdout[:-1]

            if 'AppleDouble encoded Macintosh file' in filetype:
                appledoubles = appledoubles + 1
            elif 'Apple QuickTime movie' in filetype:
                quicktimes = quicktimes + 1
                dstfile = Path(dstdir, entry.name)
                if not dstfile.exists():
                    # Convert the file, putting the output in videos
                    subprocess.run(['ffmpeg', '-i', entry.path, '-c:v',
                                    'libx264', str(dstfile)])
                else:
                    print(dstfile, 'exists')
            else:
                print(filetype)
                others = others + 1
            #print(filetype)

    print(appledoubles, quicktimes, others)
    # Verify what a working video looks like
    #subprocess.run(['file', srcdir + '/bridge.mp4'])

main()
