# Go to:
* [Birds](#birds)
* [Keybinds](#keybinds)
* [Medals](#medals)
* [Shop](#shop)
* [Cookies](#cookies)
* [Credits](#credits)

# Flappy-Bird
Flappy Bird completely made in html, css and javascript

Game: Fly between the opstacles to get a high score. Collect the coins and try to get far.  
Spend the coins on new skins in the shop to play with.

## Birds
| Bird | Look of the bird |
| ------ | :----: |
| Red | ![Red Bird](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/Red.png) |
| Blue | ![Blue Bird](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/Blue.png) |
| Yellow | ![Yellow Bird](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/Yellow.png) |
| Rainbow | ![Rainbow Bird](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/Rainbow.png) |
| Green | ![Green Bird](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/Green.png) |
| Pink | ![Pink Bird](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/Pink.png) |
| Orange | ![Orange Bird](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/Orange.png) |
| Purple | ![Purple Bird](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/Purple.png) |
| Lime | ![Lime Bird](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/Lime.png) |
| Floppy | ![Floppy Bird](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/Floppy.png) |
| Bubble | ![Bubble Bird](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/Bubble.png) |
| Grellow (don't ask) | ![Grellow Bird (again don't ask)](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/Grellow.png) |
| Ukraine | ![Ukraine Bird](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/Ukraine.png) |
| Kirby | ![Kirby Bird](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/Kirby.png) |
| ParasolKirby | ![ParasolKirby Bird](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/ParasolKirby.png) |
| FloatKirby | ![FloatKirby Bird](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/Birds/FloatKirby.png) |
| And more! | :smiley: |


## How to add more birds

* To add more birds add a 31x26 .png image in `frontend/images/birds`.
* Go to `frontend/js/birdColors.js`.
* And add the file name along with the price in the list with the other birds ONLY THE NAME not .png behind it.  

    For example:  
    ```javascript
    const birdColors = [
        {
            color: 'Yellow',
            price: 200
        },
        // Add this and replace the comments with needed info:
        {
            color: /* color name */,
            price: /* price of bird */
        }
    ];
    ```
* Yes it is possible to animate .png images and those animations will then play in the game (or just use static images)  
    Don't ask how, we don't know.

## KeyBinds

| Key | Action |
| :----- | :----: |
| W | Fly |
| Arrow Up | Fly |
| Space | Fly |
| Click | Fly |
| Touch | Fly |

###### Yea it is basically just fly :D

## Medals

You can win medals based on the score you get:

| Score | Medal | Image |
| ------ | ------ | ------ |
| 0- 49 | Bonze | ![Bonze Medal](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/medals/bronze.png) |
| 50-99 | Silver | ![Silver Medal](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/medals/silver.png) |
| 100+ | Gold | ![Gold Medal](https://github.com/xflipperkast/Flappy-Bird/blob/main/frontend/images/medals/gold.png) |

## Shop

![Shop](https://i.ibb.co/KKpDYcL/image.png)


## Cookies
We use it for saving data about the game like your personal best score, bought colors, equiped colors and coins.   
These cookies are needed for the game to work as intended!  
These cookies are **NOT** used to track you or sell data to advertisment companies (Even we can't see them).

**It is adviced to leave the cookies alone and not edit them as that can cause unexpected issues!**

## Credits!
Original Project starter: https://github.com/xflipperkast  
Cookies and most bug fixes and shop: https://github.com/ShadowWolf308
