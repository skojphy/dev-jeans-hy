<script lang="ts">
  import type {PhotoRes} from 'src/types/photo'

  export let photos: PhotoRes[] = []
</script>

<div class="grid">
  {#each photos as photo}
    <div class="item">
      <img src={photo.thumbnailImageUrl} alt={photo.photoTitle} />
    </div>
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
    padding: 1rem;
    display: grid;
    place-items: center;
  }

  .item::before {
    content: '';
    display: block;
    padding-bottom: 100%;
    grid-area: 1 / 1 / 2 / 2;
  }

  img {
    width: 100%;
    grid-area: 1 / 1 / 2 / 2;
  }
</style>
