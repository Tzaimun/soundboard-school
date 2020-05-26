<template class="header">
  <div>
    <nav>
        <div class="logo">
            <h4>Soundboard</h4>
        </div>
        <ul class="nav-links">
            <li>
                <router-link to="register">Signup</router-link>
            </li>
            <li>
                <router-link to="login">Login</router-link>
            </li>
        </ul>
        <div class="burger">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        </div>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

nav{
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 8vh;
    background-color: #2f3f53;
    font-family: 'Poppins', sans-serif;
    border-bottom-style: solid;
    border-bottom-color: black;
    width: 100%;
}

.logo{
    margin-left: 45px;
    margin-right: 150px;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 5px;
    font-size: 20px;
}
.nav-links{
    margin-left: 900px;
    display: flex;
    justify-content: space-around;
    width: 15%;

}
.nav-links li{
    list-style: none;
}
.nav-links a{
    color: #ffffff;
    text-decoration: none;
    letter-spacing: 3px;
    font-weight: bold;
    font-size: 14px;
}

.burger div{
    display: none;
}

.burger div{
    width: 25px;
    height: 3px;
    background-color: #ffffff;
    margin: 5px;
}

@media screen and (min-width:768){
  .nav-links{
    display: flex;
    justify-content: space-around;
  }
}

@media screen and (max-width:768px){
    body{
        overflow-x: hidden;
    }
    .nav-links{
        position: absolute;
        right: 0px;
        height: 92vh;
        top: 8vh;
        background-color: #2f3f53;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        transform: translateX(100%);
    }
    .nav-links li{
        opacity: 0;
    }
    .burger{
    display: block;
    }
}
</style>
