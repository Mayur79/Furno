import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import  axios from 'axios';
const OrderCompletedPage = () => {

    const { orderId } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/getOrderDetails/${orderId}`);
            setOrder(response.data);
       
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        };
        fetchProduct();
    }, [orderId]);    
  return (
    <>
    <div>
        Order Completed

        <div>
         Order id   {orderId}
        </div>
        <div>
            {order.amount}
        </div>
        <div>
            {order.status}
        </div>
    </div>
    </>
  )
}

export default OrderCompletedPage