import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getCoupans = async () => {
  const response = await axios.get(`${base_url}coupon/getAllcoupon`, Config);
  return response.data;
};
const createCoupon = async (coupon) => {
  const response = await axios.post(
    `${base_url}coupon/createcoupon`,
    coupon,
    Config
  );
  return response.data;
};
const updateACoupon = async (Coupon) => {
  const response = await axios.put(
    `${base_url}coupon/${Coupon.id}`,
    {
      expiry: Coupon.CouponData.expiry,
      name: Coupon.CouponData.name,
      discount: Coupon.CouponData.discount,
    },
    Config
  );
  return response.data;
};
const getCoupon = async (id) => {
  const response = await axios.get(`${base_url}coupon/${id}`, Config);
  return response.data;
};
const deleteCoupon = async (id) => {
  const response = await axios.delete(`${base_url}coupon/${id}`, Config);

  return response.data;
};
const couponService = {
  getCoupans,
  createCoupon,
  updateACoupon,
  getCoupon,
  deleteCoupon,
};
export default couponService;
