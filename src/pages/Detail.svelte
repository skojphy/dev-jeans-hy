<script lang="ts">
  import Layout from 'src/components/Layout/Layout.svelte'
  import likeDefault from 'src/assets/icons/like_default.svg'
  import likeFilled from 'src/assets/icons/like_filled.svg'
  import deleteIcon from 'src/assets/icons/delete.svg'

  // export let params = {
  //   id: 0,
  // }
  // TODO: param.id로 photoInfo 가져오기

  const photoInfo = {
    photoId: 1,
    photoTitle: '내가 만든 버니',
    thumbnailImageUrl: 'src/assets/dev-jeans2.png',
    imageUrl: 'src/assets/dev-jeans2.png',
    createdDate: '2021-08-01',
    lastModifiedDate: '2021-08-01',
    likeCount: 15003,
    visitCount: 0,
    creator: '@hyeyeon',
  }

  const {photoTitle, imageUrl, createdDate, likeCount, creator} = photoInfo

  const isAuthor = true
  const isLiked = true

  // TODO: 삭제 기능 연결
  // 작성자인지 user와 비교하기
  // TODO: 좋아요 기능 연결
</script>

<Layout title="사진 보기">
  <div class="container">
    <div class="titleArea">
      <h2 class="title">{photoTitle}</h2>
      <p class="creator">{creator}</p>

      {#if isAuthor}
        <button class="delete">
          <img src={deleteIcon} alt="버니 삭제" />
        </button>
      {/if}
    </div>

    <img src={imageUrl} alt="버니" />

    <div class="description">
      <div class="like">
        <button class="likeButton">
          <img src={isLiked ? likeFilled : likeDefault} alt={`좋아요 ${isLiked ? '눌림' : '눌리지 않음'}`} />
        </button>
        <p class="likes">{likeCount}</p>
      </div>
      <p />
      <p class="created">{createdDate}</p>
    </div>
  </div>
</Layout>

<style>
  .titleArea {
    padding: 10px;
    text-align: left;
    background-color: #edf0f3;
    color: #495057;
    border-radius: 10px 10px 0 0;
  }
  .title,
  .creator {
    display: inline-block;
  }
  .description {
    padding: 10px;
    background-color: #edf0f3;
    color: #495057;
    /* border-radius: 0 0 10px 10px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .like {
    display: flex;
    align-items: center;
  }
  button {
    border: none;
    padding: 0;
    cursor: pointer;
  }
  .likes {
    font-size: 20px;
    padding-left: 5px;
    line-height: 24px;
  }
  .created {
    line-height: 24px;
  }
</style>
