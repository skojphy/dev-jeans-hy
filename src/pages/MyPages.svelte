<script lang="ts">
  import Layout from 'src/components/Layout/Layout.svelte'

  import devJeans from 'src/assets/dev-jeans.png'
</script>

<Layout title="나의 버니들">
  <!-- TODO. 내가 올린 버니들을 모아보기 -->
  <!-- TODO. 사진 클릭하면 디테일 페이지로 이동 -->
  <div>
    <img src={devJeans} alt="버니" />
  </div>
</Layout>
