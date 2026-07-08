"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Box } from "@mui/material";
import { GridView, Apartment, DirectionsCar, BusinessCenter, People, Agriculture, Build } from "@mui/icons-material";

// Import Swiper styles
import "swiper/css";

import CategoryCard from "./Category-Card";

const categoriesData = [
  {
    id: "all",
    title: "All Categories",
    count: "12,400 listings",
    icon: <GridView />,
  },
  {
    id: "real-estate",
    title: "Real Estate",
    count: "4,820 listings",
    icon: <Apartment />,
  },
  {
    id: "vehicles",
    title: "Vehicles",
    count: "2,310 listings",
    icon: <DirectionsCar />,
  },
  {
    id: "commercial",
    title: "Commercial",
    count: "1,640 listings",
    icon: <BusinessCenter />,
  },
  {
    id: "labour",
    title: "Labour",
    count: "980 listings",
    icon: <People />,
  },
  {
    id: "agriculture",
    title: "Agriculture",
    count: "750 listings",
    icon: <Agriculture />,
  },
  {
    id: "services",
    title: "Services",
    count: "1,200 listings",
    icon: <Build />,
  },
];

export interface CategoryProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

const Category: React.FC<CategoryProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".category-prev",
          nextEl: ".category-next",
        }}
        spaceBetween={20}
        slidesPerView="auto"
        style={{ width: "100%", paddingBottom: "10px" }}
      >
        {categoriesData.map((category) => (
          <SwiperSlide key={category.id} style={{ width: "auto" }}>
            <Box sx={{ width: { xs: "240px", sm: "280px" } }}>
              <CategoryCard
                title={category.title}
                count={category.count}
                icon={category.icon}
                isActive={activeCategory === category.id}
                onClick={() => onSelectCategory(category.id)}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Category;
