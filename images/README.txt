TRADENEST — PRODUCT IMAGES
==========================

Drop your product photos in THIS folder, then point to them in app.js.

HOW TO ADD A PHOTO (one product at a time)
------------------------------------------
1) Copy the image file into this  images/  folder. For example:
       images/earbuds-front.jpg
       images/earbuds-case.jpg

2) Open  app.js  and find the  PHOTOS  map near the top
   (just under the PRODUCTS list). Add the file(s) by product id:

       const PHOTOS = {
         1: ["images/earbuds-front.jpg", "images/earbuds-case.jpg"],
         2: ["images/smartphone.jpg"],
       };

   - The id is the product's number in the PRODUCTS list in app.js
     (1 = TWS Wireless Earbuds, 2 = Smartphone, ... 20 = Travel Backpack).
   - ONE file  = a single image.
   - TWO+ files = an automatic image carousel (arrows + dots).

3) Save and refresh index.html in the browser.

Any product you haven't added photos for yet will keep showing the
elegant "Image coming soon" placeholder automatically.

TIPS
----
- Square images look best (e.g. 800 x 800 or 1000 x 1000).
- JPG, PNG, or WebP all work.
- Keep file names lowercase with dashes, no spaces.

PRODUCT ID REFERENCE
--------------------
 1  TWS Wireless Earbuds            11  RGB LED Strip 5m
 2  6.7" Android Smartphone         12  1080P WiFi Security Camera
 3  65W GaN USB-C Charger           13  4K Camera Drone
 4  20000mAh Power Bank             14  Robot Vacuum Cleaner
 5  Portable Bluetooth Speaker      15  Digital Air Fryer 5L
 6  AMOLED Smart Watch              16  Men's Cotton T-Shirt
 7  VR Headset 3D                   17  Slim-fit Denim Jeans
 8  14" Business Laptop             18  Women's Summer Dress
 9  RGB Mechanical Keyboard         19  Running Sneakers
10  2.4G Wireless Mouse             20  Travel Backpack
