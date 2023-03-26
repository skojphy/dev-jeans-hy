<script lang="ts">
  import {userInfo} from 'src/store/user'
  import Modal from 'src/components/Modal/Modal.svelte'
  import Noti from '../Noti.svelte'
  import {uploadPhoto} from 'src/api/service/photo'

  let showModal = false
  let inputImage: HTMLInputElement

  const upload = () => {}

  const onClick = () => {
    showModal = true
  }

  const handleAddImage = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement
    },
  ) => {
    const files = e.currentTarget.files
    if (!files) return
    const file = files[0]
    if (!file) return
    const url = URL.createObjectURL(file)

    // TODO. 썸네일 이미지 생성해서 올리기
    // 압축라이브러리는 sharp, imagemiin 사용
    const formData = new FormData()
    formData.append('file', file, file.name)

    uploadPhoto({
      photo_title: '버니',
      image: formData,
      thumbnail: formData,
    }).then((res) => {
      console.log('사진 업로드!', {res})
    })
  }
</script>

<div class="container">
  <div class="profile-wrapper">
    <img src={$userInfo.profileImage} alt={$userInfo.email} aria-hidden="true" />
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

  <button
    on:click={() => {
      inputImage.click()
    }}>버니 올리기</button
  >
  <input bind:this={inputImage} on:change={handleAddImage} type="file" accept="image/*" style="display: none" />

  <button class="save" on:click={upload}>확인</button>
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
