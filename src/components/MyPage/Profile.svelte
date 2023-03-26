<script lang="ts">
  import {userInfo} from 'src/store/user'
  import Modal from 'src/components/Modal/Modal.svelte'
  import Noti from '../Noti.svelte'

  let showModal = false

  const upload = () => {}

  const onClick = () => {
    showModal = true
  }
</script>

<div class="container">
  <div class="profile-wrapper">
    <img src={$userInfo.profilePictureUrl} alt={$userInfo.email} aria-hidden="true" />
    <div class="detail">
      <span>{$userInfo.lastName} {$userInfo.firstName}</span>
      <!-- TODO. 버니 업로드 모달 띄우기 -->
      <button type="button" on:click={onClick}>나의 버니 업로드하기</button>
    </div>
  </div>
  <Noti text="버니는 최대 6개까지 업로드 가능합니다." />
</div>

<Modal bind:showModal>
  <h2 slot="header">나만의 버니를 업로드해주세요.</h2>
  <button class="save" on:click={upload}>업로드</button>
</Modal>

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
</style>
