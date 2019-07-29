# marching

marching squares for p5.js

conversión de trama a vector, isosuperficies

光栅到矢量转换, isosurfaces

वेक्टर रूपांतरण के लिए रेखापुंज, समद्विबाहु

래스터 - 벡터 변환, 등면 서체

1. drop the js file into your p5js lib folder
2. call `marchingSquares(data, thresh)` where data is an array of arrays containing single values to compare. `[ [0,0,0,0] ,[0,0,0,0] ,[0,0,0,0] ,[0,0,0,0] ]` and thresh is the value against which the array cells are compared in producing a wireframe. What you get back is an array of arrays of 4 values each: x1, y1, x2, y2, for easy use in `line()`
