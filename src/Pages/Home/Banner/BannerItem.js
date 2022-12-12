import React from 'react';
import './BannerItem.css'

const BannerItem = ({ slide }) => {
    const { image, id, prev, next } = slide;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='carousel-img'>
                <img src={image} alt="" className="w-full" />
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4">
                <h1 className='text-6xl font-bold text-white'>
                    Affordabele <br />
                    Price for car <br />
                    Pricing
                </h1>
            </div>
            <div className="absolute flex justify-end w-1/2 transform -translate-y-1/2 left-24 top-1/2">
                <p className='text-white'>
                    There are many variations of passages of  available, but the majority have suffered alteration in
                    some form
                </p>
            </div>
            <div className="absolute flex justify-center w-1/2 transform -translate-y-1/2 top-3/4">
                <button className="btn btn-warning mr-5">Warning</button>
                <button className="btn btn-outline btn-warning">Warning</button>
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0 ">
                <a href={`#slide${prev}`} className="btn btn-circle mr-5">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle bg-orange-600 text-white border-none text-bold">❯</a>
            </div>
        </div>
    );
};

export default BannerItem;