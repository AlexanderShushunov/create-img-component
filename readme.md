# create-img-component

A small util to create a preact component based on png image.

How to use:
```
    cd folder/with/img
    npx @ashushunov/create-img-component name-of-img.png
```
or for all files in a folder:
```
    cd folder/with/several-img
    npx @ashushunov/create-img-component
```
How to use:
```
    cd folder/with/img
    npx @ashushunov/create-img-component name-of-img.png
```
What it does:
  - creates a folder with name of the image;
  - converts the image to webp and avif;
  - copies all the images to the folder;
  - creates a component with picture tag with webp, avif and png sources;

The component has pros:
 - className
 - alt

Start dev example
```
    cd example
    node ../ image-name.png
```
or for both files
```
    cd example
    node ../ 
```
