<script lang="ts">
  import Layout from 'src/components/Layout/Layout.svelte'

  import devJeans from 'src/assets/dev-jeans.png'
</script>

<Layout title="버니 모아보기">
  <!-- TODO. 클릭하면 디테일 페이지로 -->
  <!-- TODO. 좋아요/최신순 정렬 -->
  <div>
    <img src={devJeans} alt="버니" />
  </div>
</Layout>
