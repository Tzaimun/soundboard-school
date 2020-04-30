<template class="header">
  <div>
    <nav>
        <div class="logo"> 
            <h4>Soundboard</h4>
        </div>
        <ul class="nav-links">
            <li>
                <a href="#">Signup</a>
            </li>
            <li>
                <a href="#">Login</a>
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
    background-color: #7957d5;
    font-family: 'Poppins', sans-serif;
}

.logo{
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 5px;
    font-size: 20px;
}
.nav-links{
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

@media screen and (max-width:1024px){
   .nav-links{
    display: flex;
    justify-content: space-around;
    width: 60%;
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
        background-color: #7957d5;
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
