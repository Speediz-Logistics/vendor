
<script setup>
import { defineProps } from 'vue';
defineProps({
  packageDetail:{
    type: Object,
    required: true
  }

});
</script>

<template>

    <div class="package-detail-page text-start" v-if="packageDetail.data">
      <table class="d-flex justify-content-between ">
        <tbody class="d-flex flex-row col-span-2">
        <tr class="package-detail d-flex flex-column">
          <th colspan="2" class="fw-bold text-spacing">Package's Detail</th>
          <td>Package ID: {{ packageDetail.data?.id }}</td>
          <td>Customer Name: {{ packageDetail.data?.package?.customer_name }} </td>
          <td>Location: {{ packageDetail.data?.package?.location }}</td>
          <td>Total Price: {{ packageDetail.data?.package?.total_price }}</td>
        </tr>

        <tr class="pickup-info d-flex flex-column">
          <th colspan="2" class="fw-bold text-spacing">Pickup's Information</th>
          <td>Pickup Date: {{ packageDetail.data?.vendor?.pickup_date }}</td>
          <td>Pickup By: {{ packageDetail.data?.vendor?.vendor_name }}</td>
          <td>Location Pickup: {{ packageDetail.data?.vendor?.vendor_address }}</td>
        </tr>
        </tbody>
      </table>
      <div>
        <table >
          <tbody class="d-flex flex-row justify-content-between">
          <tr class="delivery-detail d-flex flex-column">
            <td colspan="2" class="fw-bold text-spacing">Delivery Detail</td>
            <td>Deliver Name: {{ packageDetail.data?.delivery?.driver_name }}</td>
            <td>Deliver Contact: {{ packageDetail.data?.delivery?.driver_phone }}</td>
            <td>Delivery Date: {{ packageDetail.data?.delivery?.shipment_date }}</td>
            <td>Delivery Fee: {{ packageDetail.data?.delivery?.delivery_fee }}</td>
          </tr>

          <tr class="package-image d-flex flex-column ">
            <td colspan="2" class="fw-bold  text-spacing">Package's Image</td>
            <td v-if="packageDetail.data?.image" colspan="2" class="image">
              <img :src="packageDetail.data?.image" alt="Package Image" class="img-fluid" />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table >
          <tbody class="d-flex flex-row justify-content-between">
          <tr class="delivery-detail d-flex flex-column text-spacing">
            <td>Package Status: {{ packageDetail.data?.delivery?.package_status }}</td>
            <td>Package's Payment: {{ packageDetail.data?.package?.total_price }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<style scoped lang="scss">
.package-detail-page {
  width: 1354px;
  height: 700px;
  background-color: #ffffff;
  margin-left: 50px;
  padding: 50px;
  font-family: Inter, sans-serif;
  font-size: 20px;
  border-radius: 20px;
  box-shadow: 1px 1px 3px gray;

}
.image{
  width: 200px;
  height: 200px;
}

.package-detail,
.package-image,
.delivery-detail,
.pickup-info{
  width: 800px;
  height: 200px;
}
.text-spacing {
  margin-bottom: 10px; /* Adds 10px space below each text element */
}
</style>
