# LucidLinks

## Intro

lucidlinks is the 3d linktree of lucidmach... built using **typescript** and **threejs**

## File Structure

since this project uses **typescript**, we require a fast bundler that supports typescript like **snowpack**

The website lives in `public` dir... and the _typescript_ files that'll get compiled into _javascript_ live in `src` dir

`audio`,`textures`,`fonts` are assets that have been used in this project

## HTML

inside the HTML of this website there are 2 major components

1. `<div />` : contains normal 2D HTML content of the website, includes SVGs of various links, prompts, etc
2. `<canvas />` : this is where all the `threejs` magic happens, threejs is javascript library that renders output based on interactions and animations

## CSS

well nothing special here :)

## JavaScript/TypeScript

any threejs website requires few major components

1.  **Renderer**: basically draws triangles in the canvas
2.  **Scene**: the content/stuff that gets rendered onto the canvas

    1.  **Mesh**: every 3d object is represented as meshes(triangles) in computer graphics

        1.  **Geometry**: Defines the triangles/geometry of a mesh

        2.  **Material**: represents the properties of the surface of a mesh

            1.  **Texture**: A image that maps to the surface material of a mesh

            2.  **Material**: uses properties/paramenters to generate surface material

    2.  **Camera**: View of the camera dictates the renderer's output

    3.  **Lights**: illuminates the scene

3.  **Tick**: a recurring function that calls the next frame for rendering
4.  **Controls**: either imported / custom

> do dig into the soucecode `./src/index.ts` which is fairly well commented to get a better understanding of how it all translates into code
