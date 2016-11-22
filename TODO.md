# TODO items

- **More signs!**
    - Absent
    - (Afraid)
    - Again
    - (Angry)
    - Arrive
    - Become
    - Can
    - Cannot
    - (Deaf)
    - Don't know (know+neg)
    - Don't like (like+neg)
    - Don't mind (not-mind)
    - Evening
    - Excited
    - Favorite (favorite/prefer)
    - Friend
    - Get
    - Go to it
    - Hard of hearing
    - Have
    - Hearing
    - How
    - Introduce
    - Know
    - Last
    - Later
    - Learn
    - Like
    - Meet
    - Misunderstand
    - Morning
    - Name
    - Nice (nice/clean)
    - Night
    - Now
    - Owe (bill/owe)
    - Practice
    - Sad
    - School
    - See
    - Sick
    - Slow
    - So-so
    - Thank you (good/thank you)
    - Tomorrow
    - Yes
    - Yesterday
- Too much presented at once
    - Ask questions one by one?
    - Integrate all the (many) body images (no more than 2)?
    - Fix regions for new images:
        - Add to frontregions:
            - temple
            - lowtemple
        - Add to sideregions: 
            - shoulder
            - thigh
            - neck
            - above right shoulder
            - high right
            - right
        - Add regions in front of the body:
            - frontregions: pretty well all of them
            - sideregions: 
                - stomach
                - waist
                - neck
                - chin
                - mouth
                - nose
                - eye
                - forehead
                - shoulder
                - above right shoulder
                - high right
                - right
    - Show handshapes in 2 steps: class and then the one row (far less space)?
- Refactor/clarify code
    - functions.js needs organization (MVC)
    - sign.js: Sign class is too big, too much stuff coupled together

Interaction:

Start: User is presented with front/side images of body, and a box for the beginning handshape of the dominant hand.

Front/side images of body choose starting and ending locations of the dominant hand, with a dropdown to indicate which is being chosen.  Once locations are chosen, they are indicated on the images.  (Default is end=start? I'm not sure that's right--PHB.)

Motion types cause an arrow of the appropriate kind to be displayed from start to end.  The motion can be rotated by sliders?  Dragging?  Have to experiment here.

Handshape box chooses starting handshape of dominant hand.  If the user indicates more than one hand, another box is presented for the non-dominant handshape.  If the user indicates ending handshape != beginning handshape, another box is presented for that.

Handshape is chosen by clicking the appropriate box, which presents the handshape choice as a popup.  This can be done as a nested menu: choose the group first, then the shape within it; hovering displays the hshapes in that group.  Once chosen, the handshape is displayed in the appropriate box.