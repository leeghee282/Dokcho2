<template>
  <div class="changePw_container">
    <div class="myPassword">
      <div class="changePw__inputs">
        <p>๐ ์๋ฌธ์+์ซ์+ํน์๋ฌธ์ ์กฐํฉ์ผ๋ก 8~25์๋ฆฌ</p>
        <input
          v-model="oldPassword"
          type="password"
          placeholder="ํ์ฌ ๋น๋ฐ๋ฒํธ"
        />
        <br />
        <input
          @keyup="checkPassword()"
          v-model="newPassword"
          type="password"
          placeholder="์ ๋น๋ฐ๋ฒํธ"
        />
        <span class="allowedtext" v-if="this.isPasswordChecked"
          >์ด ๋น๋ฐ๋ฒํธ๋ ์ฌ์ฉํ์๋ ์ข์์</span
        >
        <span
          class="warningtext"
          v-else-if="!this.isPasswordChecked && this.newPassword !== undefined"
          >๋น๋ฐ๋ฒํธ ์์ฑ ์กฐ๊ฑด์ ํ์ธํด์ฃผ์ธ์</span
        >
        <br />
        <input
          v-model="newPassword2"
          type="password"
          placeholder="์ ๋น๋ฐ๋ฒํธ ํ์ธ"
        />
        <span
          class="warningtext"
          v-if="
            this.newPassword !== this.newPassword2 &&
            this.newPassword2 !== undefined
          "
          >๋น๋ฐ๋ฒํธ๋ฅผ ํ์ธํด์ฃผ์ธ์</span
        >
      </div>
      <div class="changePw__btn">
        <button @click="this.$parent.closePassword" class="cancel__btn">
          ์ทจ์
        </button>
        <button @click="this.changePassword()" class="complete__btn">
          ์์  ์๋ฃ
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '@/constant/BASE_URL'
import swal from 'sweetalert'

var passwordCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/

export default {
  data() {
    return {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      newPassword2: this.newPassword2,
      isPasswordChecked: false,
      today: '',
      cdate: '',
      password: false
    }
  },
  methods: {
    checkPassword() {
      if (passwordCheck.test(this.newPassword)) {
        this.isPasswordChecked = true
      } else {
        this.isPasswordChecked = false
      }
    },
    changePassword() {
      if (!passwordCheck.test(this.newPassword)) {
        swal({
          title:
            '๋น๋ฐ๋ฒํธ๋ ์๋ฌธ์+์ซ์+ํน์๋ฌธ์ ์กฐํฉ์ผ๋ก 8~25์๋ฆฌ๋ฅผ ์ฌ์ฉํด์ผํด์',
          icon: 'error',
          text: '๐ค',
          buttons: false,
          timer: 2000
        })
      } else if (this.newPassword === this.newPassword2) {
        axios
          .put(
            BASE_URL + '/api/v1/user/password/',
            {
              newPW: this.newPassword,
              nowPW: this.oldPassword
            },
            {
              headers: {
                'Content-Type': 'application/json',
                AUTHORIZATION: 'Bearer ' + localStorage.getItem('accessToken')
              }
            }
          )
          .then(() => {
            swal({
              title: '๋น๋ฐ๋ฒํธ๊ฐ ๋ณ๊ฒฝ๋์์ต๋๋ค!๐',
              icon: 'success',
              text: '๋ฐ๋ ๋น๋ฐ๋ฒํธ๋ก ๋ก๊ทธ์ธ ํด์ฃผ์ธ์๐',
              buttons: false,
              timer: 1500
            })
            this.$parent.closePassword()
          })
          .catch((err) => {
            console.log(err)
            swal({
              title: 'ํ์ฌ ๋น๋ฐ๋ฒํธ๋ฅผ ํ์ธํด์ฃผ์ธ์๐ฅ',
              icon: 'warning',
              text: '์๋ ฅํด์ฃผ์  ๋น๋ฐ๋ฒํธ์ ํ์ฌ ๋น๋ฐ๋ฒํธ๊ฐ ๋ค๋ฅธ ๊ฒ ๊ฐ์์๐',
              buttons: false,
              timer: 1500
            })
          })
      } else {
        swal({
          title: '์ ๋น๋ฐ๋ฒํธ๋ฅผ ํ๋ฒ ๋ ํ์ธํด ์ฃผ์ธ์๐ข',
          icon: 'error',
          text: '๋ ๋น๋ฐ๋ฒํธ๊ฐ ๋ค๋ฅธ ๊ฒ ๊ฐ์์..๐',
          buttons: false,
          timer: 1500
        })
      }
    }
  }
}
</script>

<style scoped>
button {
  height: 4vh;
  border-radius: 50px;
  border: none;
  width: 5vw;
  margin: 0.5vh;
  cursor: url('@/assets/selector.cur'), pointer;
}

.complete__btn:hover {
  background-color: #6bfa8d;
}

.cancel__btn:hover {
  background-color: #ff6a60;
}

.changePw_container {
  width: 100vw;
  height: 100vh;
  z-index: 50;
  top: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
}
.myPassword {
  width: 70%;
  height: 38%;
  z-index: 60;
  flex-direction: column;
  position: fixed;
  background-color: rgb(200, 200, 200);
  right: 15%;
  top: 55%;
  border-radius: 20px;
}

.changePw__inputs {
  padding-top: 1.5vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-bottom: 0.7vw;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.changePw__btn {
  margin-bottom: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

input {
  width: 60%;
  border: 2px solid #aaa;
  border-radius: 10px;
  margin: auto;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
}

input:focus {
  border-color: dodgerBlue;
  box-shadow: 0 0 8px 0 dodgerBlue;
}

p {
  margin-bottom: 1vh;
}
</style>
