<template>
  <header>
    <nav class="nav-bar">
      <div class="navigation">
        <span class="logo">
          <a class="navbar-brand" href="#">
            <img src="@/assets/icon/logo.svg" alt="Logo" class="logo">
          </a>
        </span>
        <ul class="navbar-nav">
          <li>
            <input type="text" placeholder="What are you looking for?">
          </li>
          <li>
            <a>
              <img src="@/assets/icon/notification.svg" alt="notification icon" class="notification">
            </a>
          </li>
          <li>
            <a @click="handleSetting">
              <img src="@/assets/icon/profile.svg" alt="profile icon" class="profile">
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>


  <div class="content-fade-in">
    <img src="@/assets/images/heroContent.png" alt="hero-content">
  </div>
  <div>
    <h1>Explore your service</h1>
  </div>
  <div class="content">
    <button class="content-1" @click="packageManagement()">
      <a>
        <img src="@/assets/icon/content1.svg" alt="icon content1">
      </a>
      <p> Packages<br>Management</p>
    </button>
    <button class="content-2" @click="dailyTracking()">
      <a>
        <img src="@/assets/icon/content2.svg" alt="icon content1">
      </a>
      <p> Packages <br>Tracking</p>
    </button>
    <button class="content-3" @click="invoiceManagement()">
      <a>
        <img src="@/assets/icon/content3.svg" alt="icon content1">
      </a>
      <p>Invoices Management</p>
    </button>
  </div>

</template>

<script setup>
import {useRouter} from 'vue-router'
import {useAuthStore} from "@/store/auth.js";

const router = useRouter()
const authStore = useAuthStore();

const handleSetting = () => {
  router.push({name: 'profile-setting'})
}
const packageManagement = () => {
  router.push({name:'package-management'});

}
const dailyTracking = () => {
  router.push({name:'package-tracking'});

}
const invoiceManagement = () => {
  router.push({name:'daily-invoice'})
}
</script>

<style scoped lang="scss">

.nav-bar {
  background-color: #FFBD59;
  padding: 10px 10px;
  width: 100%;
  height: 50px;
  position: absolute;
  display: flex;
  justify-content: left;
  align-items: center;
  animation: content-fade-in 0.6s ease-out forwards;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: content-fade-in 0.6s ease-out forwards;
}

.logo {
  display: flex;
  align-items: center;

}

.logo img {
  height: 40px;
}

.navbar-nav {
  display: flex;
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.navbar-nav li {
  margin-left: 20px;
}

.navbar-nav input[type="text"] {
  margin-left: 10px;
  padding: 5px 10px;
  width: 800px;
  height: 40px;
  border: none;
  border-radius: 10px;
}

.navbar-nav .notification {
  margin-left: 150px;
  height: 40px;
  width: 40px;
  align-items: center;

}

.navbar-nav .profile {
  height: 40px;
  width: 40px;
  align-items: center;

}

.hero-content img {
  max-width: 100%;
  height: 30%;
}

h1 {
  padding-bottom: 40px;
  font-size: 2em;
  font-weight: bold;
  font-family: Inter, sans-serif;
  animation: content-fade-in 0.6s ease-out forwards;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-family: inter, sans-serif;
  animation: content-fade-in 0.6s ease-out forwards;

  .content-1,
  .content-2,
  .content-3 {
    border: none;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 30%;
    height: 100px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Adding transition for animation */
  }

  .content-1:hover,
  .content-2:hover,
  .content-3:hover {
    transform: scale(1.05); /* Scale up on hover */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Darker shadow on hover */
  }

  .content-1 img,
  .content-2 img,
  .content-3 img {
    width: 150px;
    height: 150px;
    text-align: center;
  }
}

.content-1 p,
.content-2 p,
.content-3 p {
  font-size: 20px;
  text-align: center;
}


/* Apply the keyframes to content for a fade-in effect */
.content-1,
.content-2,
.content-3 {
  animation: content-fade-in 0.6s ease-out forwards;
}


</style>
