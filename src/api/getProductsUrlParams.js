import axios from "axios"
import { useState, useEffect } from 'react';

const controller = new AbortController();

export const getProductsUrlParams = async (url) => {
    let data = []
    try {
        const response = await fetch(url, { signal: controller.signal })
        data = response.json();
        
    } catch (err) {
        console.log("Error : " , err)
    } finally {
       
    }
  return data;
}