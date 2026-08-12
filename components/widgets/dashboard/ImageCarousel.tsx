"use client";
import { IMAGE_CAROUSEL_DATA } from "@/utils/types";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const ImageCarousel = ({ data }: IMAGE_CAROUSEL_DATA) => {
  return (
    <Box>
      <Swiper>
        {data.map((val, i) => (
          <SwiperSlide key={i}>
            <Image
              src={val}
              alt=""
              fill
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageCarousel;
