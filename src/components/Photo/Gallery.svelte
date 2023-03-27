<script lang="ts">
  import type {PhotoRes} from 'src/types/photo'
  import {link} from 'svelte-spa-router'
  import Like from 'src/assets/icons/like_filled.svg'

  export let photos: PhotoRes[] = []
</script>

<!-- TODO. 갤러리 스켈레톤 UI 적용 -->
<div class="grid">
  {#each photos as photo}
    <a href={`/detail/${photo.photoId}`} use:link class="item">
      <img class="photo" src={photo.thumbnailImageUrl} alt={photo.photoTitle} />
      <div class="like">
        <span class="like-count">{photo.likeCount}</span>
        <img width="15" src={Like} alt={`좋아요 ${photo.likeCount}개`} />
      </div>
    </a>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 10px;
  }

  .item {
    background: #eee;
    display: grid;
    place-items: center;
    position: relative;
  }

  .item::before {
    content: '';
    display: block;
    padding-bottom: 100%;
    grid-area: 1 / 1 / 2 / 2;
  }

  .photo {
    width: 100%;
    grid-area: 1 / 1 / 2 / 2;
  }

  .like {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    background-color: rgba(255, 255, 255, 0.638);
    padding: 5px 15px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
  }
  .like > span {
    margin-right: 5px;
    color: rgb(55, 55, 55);
  }
</style>
