<script lang="ts">
  import {userInfo} from 'src/store/user'
  import Noti from '../Noti.svelte'
  import {push} from 'svelte-spa-router'

  let imageUrl = ''
  let file: File = null

  const handleAddImage = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement
    },
  ) => {
    const files = e.currentTarget.files
    if (!files) return
    file = files[0]
    if (!file) return
    imageUrl = URL.createObjectURL(file)
  }

  const onClick = () => {
    push('/')
  }

  const deleteImage = () => {
    imageUrl = ''
    file = null
  }
</script>

<div class="container">
  <div class="profile-wrapper">
    <img src={$userInfo?.profileImage} alt={$userInfo?.email} aria-hidden="true" />
    <div class="detail">
      <span>{$userInfo?.lastName} {$userInfo?.firstName}</span>
      <!-- TODO. 버니 업로드 모달 띄우기 -->
      <button type="button" on:click={onClick}>나의 버니 만들어서 업로드하기</button>
    </div>
  </div>
  <Noti text="버니는 최대 6개까지 업로드 가능합니다." />
</div>

<style>
  .container {
    width: 100%;
    padding: 10px;
  }
  .profile-wrapper {
    width: 100%;
    padding: 10px;
    border: 1px solid #e6e6e6;
    border-radius: 6px;
    margin-bottom: 20px;
    display: flex;
  }
  .profile-wrapper > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 10px;
  }
  .detail {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  span {
    font-weight: 700;
  }
  button {
    box-sizing: border-box;
    padding: 10px 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    font-weight: 700;
    cursor: pointer;
    font-size: 12px;
    margin-left: 20px;
  }

  .preview {
    background: #eee;
    display: grid;
    place-items: center;
  }

  .preview::before {
    content: '';
    display: block;
    padding-bottom: 100%;
    grid-area: 1 / 1 / 2 / 2;
  }

  .preview > img {
    width: 100%;
    grid-area: 1 / 1 / 2 / 2;
  }

  .default {
    opacity: 0.5;
    filter: grayscale(100%);
  }
</style>
