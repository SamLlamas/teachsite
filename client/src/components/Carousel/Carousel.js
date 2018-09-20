import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


export const Carousels = ({ children }) => (
  <Carousel>
    {children}
  </Carousel>
)
