import styled from "styled-components";
import { hoteldata } from "../data";
import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';
import {StarIcon} from '@chakra-ui/icons';
import { Box, Badge, Image } from '@chakra-ui/react'

function ChooseCity() {
  const [value, setValue] = useState('react');
  return (
    <SegmentedControl
      fullWidth
      size={"md"}
      radius={"sm"}
      color={"orange"}
      transitionDuration={250}
      transitionTimingFunction="linear"
      value={value}
      onChange={setValue}
      data={[
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' },
        { label: '成都', value: 'chengdu' },
        { label: '重庆', value: 'chongqing' },
        { label: '南京', value: 'nanjing' },
        { label: '杭州', value: 'hangzhou' },
      ]}
    />
  );
}

// Sample card from Airbnb

function AirbnbExample(props) {

  return (
    <Box as='button' onClick={()=>console.log("hah")} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={props.img} alt={'image'} />

      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            可入住
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {props.beds} beds &bull; {props.baths} baths
          </Box>
        </Box>

        <Box
          display='flex'
          mt='2'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          isTruncated
        >
          {props.title}
        </Box>

        <Box display='flex' mt='1'>
          {props.formattedPrice}
          <Box as='span' color='gray.600' fontSize='sm'>
            / 晚
          </Box>
        </Box>

        <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < props.rating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            {props.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default function Explore() {
  return (
    <ExploreSection>
      <h2 style={{marginBottom:"15px"}}>酒店推荐</h2>
      <ChooseCity />
      <div className="items">
        {hoteldata.map((item, index) => (
          <AirbnbExample 
          key={index}
          img={item.img}
          title={item.title}
          reviewCount={item.reviewCount}
          beds={item.beds}
          baths={item.baths}
          formattedPrice={item.formattedPrice}
          rating={item.rating}
          />
        ))}
      </div>
    </ExploreSection>
  );
}

const ExploreSection = styled.section`
  .items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(239px, 1fr));
    gap: 1.5rem;
    margin-bottom: -1.5rem;
    padding: 1.5rem 0;
    &::-webkit-scrollbar {
      -webkit-appearance: none;
      display: none;
    }
  }
  .item {
    display: flex;
    align-items: center;
    border-radius: 1rem;
    transition: all 0.2s;
    cursor: pointer;
    span {
      padding: 0 1.5rem;
      white-space: nowrap;
      transition: padding 0.2s;
    }
    .img {
      position: relative;
      width: 5rem;
      height: 5rem;
      img {
        border-radius: 1rem;
        transition: transform 0.2s;
        width: 100%;
      }
      & > div:first-child {
        position: absolute !important;
        overflow: visible !important;
      }
      & > div {
        width: 100%;
      }
      img.shadow {
        filter: blur(0.5rem) brightness(80%);
        transform: translateY(0.25rem) scaleX(0.9);
        z-index: -1;
        opacity: 0.6;
      }
    }
    &:hover {
      background: var(--white);
      box-shadow: 0 0.25rem 0.5rem #48484810;

      img.shadow {
        transform: translateY(0) scale(0);
      }
      img {
        transform: scale(0.8);
      }
      span {
        padding: 0 2.5rem 0 0.5rem;
      }
    }
    @media (max-width: 36rem) {
      .items {
        grid-template-columns: repeat(4, 1fr);
        overflow: scroll;
        margin: 0 -1.5rem -1.5rem -1.5rem;
        padding: 1.5rem;
        scroll-snap-type: x mandatory;
        scroll-padding-left: 1.5rem;
      }
      .item {
        scroll-snap-align: start;
      }
      .item:last-of-type {
        margin-right: 10rem;
      }
    }
  }
`;
