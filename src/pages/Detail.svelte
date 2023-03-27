<script lang="ts">
  import Layout from 'src/components/Layout/Layout.svelte'
  import likeDefault from 'src/assets/icons/like_default.svg'
  import likeFilled from 'src/assets/icons/like_filled.svg'
  import {checkLikePhoto, deletePhoto, getPhoto, toggleLikePhoto} from 'src/api/service/photo'
  import {params, pop, replace} from 'svelte-spa-router'
  import {useQueryClient, createQuery, createMutation} from '@tanstack/svelte-query'
  import {userInfo} from 'src/store/user'
  import devJeans from 'src/assets/dev-jeans.png'

  $: photoQuery = createQuery({
    queryKey: ['photo', `${$params?.id}`],
    queryFn: () => getPhoto({id: $params?.id}),
    enabled: !!$params?.id,
    onError: () => {
      replace('/404')
    },
  })

  // TODO. 좋아요 낙관적 UI 적용
  $: likeQuery = createQuery({
    queryKey: ['photo', `${$params?.id}`, 'like'],
    queryFn: () => checkLikePhoto({photoId: $params?.id}),
    enabled: !!$params?.id,
  })

  $: isAuthor = $photoQuery?.data?.userDto.email === $userInfo?.email
  $: isLiked = $likeQuery?.data
  $: console.log({isLiked})

  $: creator = $photoQuery?.data?.userDto.email.split('@')[0]

  const client = useQueryClient()

  // TODO. 삭제 되었습니다 토스트 띄우기
  const deleteMutation = createMutation(() => deletePhoto({id: $photoQuery?.data?.photoId}), {
    onSuccess: () => {
      client.invalidateQueries(['bunny-list', 'ranked'])
      client.invalidateQueries(['bunny-list', 'latest'])
      client.invalidateQueries(['myPhotos'])
      pop()
    },
  })

  const handleDeletePhoto = async () => {
    $deleteMutation.mutate()
  }

  const handleToggleLikePhoto = async () => {
    try {
      isLiked = !isLiked
      await toggleLikePhoto({isLiked, id: $params?.id})
      await $photoQuery.refetch()
    } catch (e) {
      isLiked = !isLiked
    }
  }
</script>

<Layout title="사진 보기">
  <div class="container">
    <div class="titleArea">
      <h2 class="title">{$photoQuery?.data?.photoTitle}</h2>
      <p class="creator">{`@${creator}`}</p>

      {#if isAuthor}
        <button class="delete" type="button" on:click={handleDeletePhoto}>삭제</button>
      {/if}
    </div>

    <img
      class={$photoQuery?.data?.imageUrl ? '' : 'default'}
      src={$photoQuery?.data?.imageUrl || devJeans}
      alt="버니"
    />

    <div class="description">
      <div class="like">
        <button class="likeButton" on:click={handleToggleLikePhoto}>
          <img src={isLiked ? likeFilled : likeDefault} alt={`좋아요 ${isLiked ? '눌림' : '눌리지 않음'}`} />
        </button>
        <p class="likes">{$photoQuery?.data?.likeCount}</p>
      </div>
      <p class="created">{$photoQuery?.data?.createdDate}</p>
    </div>
  </div>
</Layout>

<style>
  .container {
    width: 100%;
    background-color: #fff;
    border: 1px solid #dee2e6;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  }
  .titleArea {
    padding: 10px;
    text-align: left;
    color: #495057;
    border-radius: 10px 10px 0 0;
    position: relative;
  }
  .default {
    width: 100%;
    background-color: #dee2e6;
    opacity: 0.5;
    filter: grayscale(100%);
  }
  .title,
  .creator {
    display: inline-block;
  }
  .description {
    padding: 10px;
    color: #495057;
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
    background-color: transparent;
  }
  .delete {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 20px;
    height: 100%;
    color: #ff595e;
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
