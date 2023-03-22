<script lang="ts">
  import {fabric} from 'fabric'
  import {canvas, width, hasGlasses, hasHair, hasLaptop, hasCoffee} from '../../store/canvas'
  import glasses from '../../assets/glasses.png'
  import hair from '../../assets/hair.png'
  import laptop from '../../assets/laptop.png'
  import coffee from '../../assets/coffee.png'

  type Costume = 'glasses' | 'hair' | 'laptop' | 'coffee'

  const addCostume = (costume: Costume) => {
    let costumeImg

    if (costume === 'glasses') {
      costumeImg = glasses
    } else if (costume === 'hair') {
      costumeImg = hair
    } else if (costume === 'laptop') {
      costumeImg = laptop
    } else if (costume === 'coffee') {
      costumeImg = coffee
    }

    fabric.Image.fromURL(costumeImg, function (img) {
      img.scaleToWidth($width)
      img.scaleToWidth($width)
      img.selectable = false

      img.set('costume', costume)
      $canvas.add(img)
      $canvas.renderAll()
    })
  }

  const removeCostume = (costume: Costume) => {
    const objects = $canvas.getObjects()
    const costumeObjects = objects.filter((obj) => obj.costume === costume)
    costumeObjects.forEach((obj) => $canvas.remove(obj))
  }

  $: {
    const objects = $canvas.getObjects()
    const hasObjGlasses = objects.find((obj) => obj.costume === 'glasses')
    const hasObjHair = objects.find((obj) => obj.costume === 'hair')
    const hasObjLaptop = objects.find((obj) => obj.costume === 'laptop')
    const hasObjCoffee = objects.find((obj) => obj.costume === 'coffee')

    if (!hasObjGlasses && $hasGlasses) addCostume('glasses')
    else if (hasObjGlasses && !$hasGlasses) removeCostume('glasses')

    if (!hasObjHair && $hasHair) addCostume('hair')
    else if (hasObjHair && !$hasHair) removeCostume('hair')

    if (!hasObjLaptop && $hasLaptop) addCostume('laptop')
    else if (hasObjLaptop && !$hasLaptop) removeCostume('laptop')

    if (!hasObjCoffee && $hasCoffee) addCostume('coffee')
    else if (hasObjCoffee && !$hasCoffee) removeCostume('coffee')
  }

  const toggleActive = (costume: Costume) => () => {
    if (costume === 'glasses') {
      $hasGlasses = !$hasGlasses
    } else if (costume === 'hair') {
      $hasHair = !$hasHair
    } else if (costume === 'laptop') {
      $hasLaptop = !$hasLaptop
    } else if (costume === 'coffee') {
      $hasCoffee = !$hasCoffee
    }
  }
</script>

<div class="container">
  <h2>아이템을 추가해 꾸며주세요!</h2>
  <ul class="toolbar">
    <li>
      <button class={$hasGlasses ? 'active' : ''} on:click={toggleActive('glasses')}>안경</button>
    </li>
    <li>
      <button class={$hasHair ? 'active' : ''} on:click={toggleActive('hair')}>앞머리</button>
    </li>
    <li>
      <button class={$hasLaptop ? 'active' : ''} on:click={toggleActive('laptop')}>노트북</button>
    </li>
    <li>
      <button class={$hasCoffee ? 'active' : ''} on:click={toggleActive('coffee')}>커피</button>
    </li>
  </ul>
</div>

<style>
  h2 {
    font-size: 20px;
    margin-bottom: 30px;
    word-break: keep-all;
  }
  .container {
    width: 100%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .toolbar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .toolbar > li {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
  }

  button {
    box-sizing: border-box;
    padding: 10px 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    font-size: 12px;
  }

  button.active {
    color: #fff;
    border: 1px solid rgb(80, 234, 137);
    background-color: rgb(80, 234, 137);
  }
</style>
