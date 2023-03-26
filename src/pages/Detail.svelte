<script lang="ts">
  import Layout from 'src/components/Layout/Layout.svelte'

  import devJeans from 'src/assets/dev-jeans.png'
</script>

<Layout title="사진 보기">
  <!-- TODO. 좋아요 -->
  <!-- TODO. 작성자는 삭제가능 -->

  <div>
    <img src={devJeans} alt="버니" />
  </div>
</Layout>
