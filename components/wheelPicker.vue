<template>
  <div class="wheel-picker">
    <div id="keyword1" />
    <div id="keyword2" />
    <div id="keyword3" />
  </div>
</template>

<script>
import WheelPicker from '~/assets/wheel-picker'
// https://codepen.io/gnauhca/pen/JrdpZZ

export default {
  data () {
    return {
      keywordsList: ['earth', 'soil', 'stone', 'land', 'solid', 'wood', 'forest', 'tree', 'wooden', 'fossil', 'oil', 'coal', 'carbon', 'ice', 'glacier', 'frozen', 'water', 'rain', 'sea', 'lake', 'river', 'air', 'wind', 'breathing', 'sun', 'fire', 'hot', 'energy', 'power', 'electricity', 'energetic', 'agriculture', 'farming', 'cultivation', 'infrastructure', 'base', 'framework', 'infrastructural', 'structural', 'knowledge', 'education', 'expertise', 'know-how', 'science', 'knowing', 'educated', 'labor', 'employment', 'job', 'worker', 'work force', 'culture', 'art', 'design', 'cultural', 'artistic', 'mobility', 'movement', 'mobile', 'abundance', 'excess', 'sufficiency', 'abundant', 'sufficient', 'surpulus', 'scarcity', 'shortage', 'lack', 'drought', 'famine', 'scarce', 'limited', 'rare', 'artificiality', 'artificial', 'synthetic', 'unnatural', 'nature', 'environment', 'natural', 'unaffected', 'environmental', 'sustainability', 'sustainable', 'wasefulness', 'waste', 'wasteful', 'balance', 'balanced', 'community', 'communal', 'individual', 'individuality', 'individual', 'fairness', 'fair', 'cycle', 'recycling', 'circle', 'loop', 'cyclic', 'cyclical', 'looping', 'periodic', 'line', 'edge', 'border', 'path', 'road', 'direction', 'linear', 'straight', 'care', 'responsibility', 'management', 'careful', 'responsible', 'mindful', 'neglect', 'disregard', 'endanger', 'abuse', 'damage', 'neglected', 'damaged', 'action', 'active', 'change', 'advance', 'innovation', 'shift', 'revolution', 'transformation', 'transition', 'changing', 'transform', 'stagnation', 'inaction', 'static', 'stagnant', 'rigid', 'consumption', 'consumer', 'production', 'product', 'manufacture', 'decision', 'choice', 'outcome', 'decisive', 'distribution', 'collection', 'inclusion', 'inclusive', 'exclusion', 'exclusive', 'exploitation'],
      keywordsList1: undefined,
      keywordsList2: undefined,
      keywordsList3: undefined,
      keyword1: undefined,
      keyword2: undefined,
      keyword3: undefined,
      selectedKeyword1: '',
      selectedKeyword2: '',
      selectedKeyword3: ''
    }
  },
  mounted () {
    this.keywordsList1 = this.rndShiftArray(this.keywordsList)
    this.keywordsList2 = this.rndShiftArray(this.keywordsList)
    this.keywordsList3 = this.rndShiftArray(this.keywordsList)
    this.keyword1 = new WheelPicker({
      el: '#keyword1',
      type: 'infinite',
      source: this.generateKeywordsList(this.keywordsList1),
      count: 35,
      onChange: (selected) => {
        this.selectedKeyword1 = selected.value
        this.$emit('changed', [this.selectedKeyword1, this.selectedKeyword2, this.selectedKeyword3])
        // this.keyword2.updateSource(this.getFilteredKeywordsList(2))
        // this.keyword3.updateSource(this.getFilteredKeywordsList(3))
        if (selected.value === this.selectedKeyword2 || selected.value === this.selectedKeyword3) {
          const indexOfSelectedKeyword = this.keywordsList1.findIndex(el => el === selected.value)
          this.keyword1.select(this.keywordsList1[indexOfSelectedKeyword + 1])
        }
      }
    })
    this.keyword2 = new WheelPicker({
      el: '#keyword2',
      type: 'infinite',
      source: this.generateKeywordsList(this.keywordsList2),
      count: 35,
      onChange: (selected) => {
        this.selectedKeyword2 = selected.value
        this.$emit('changed', [this.selectedKeyword1, this.selectedKeyword2, this.selectedKeyword3])
        // this.keyword1.updateSource(this.getFilteredKeywordsList(1))
        // this.keyword3.updateSource(this.getFilteredKeywordsList(3))
        if (selected.value === this.selectedKeyword1 || selected.value === this.selectedKeyword3) {
          const indexOfSelectedKeyword = this.keywordsList2.findIndex(el => el === selected.value)
          this.keyword2.select(this.keywordsList2[indexOfSelectedKeyword + 1])
        }
      }
    })
    this.keyword3 = new WheelPicker({
      el: '#keyword3',
      type: 'infinite',
      source: this.generateKeywordsList(this.keywordsList3),
      count: 35,
      onChange: (selected) => {
        this.selectedKeyword3 = selected.value
        this.$emit('changed', [this.selectedKeyword1, this.selectedKeyword2, this.selectedKeyword3])
        // this.keyword1.updateSource(this.getFilteredKeywordsList(1))
        // this.keyword2.updateSource(this.getFilteredKeywordsList(2))
        if (selected.value === this.selectedKeyword1 || selected.value === this.selectedKeyword2) {
          const indexOfSelectedKeyword = this.keywordsList3.findIndex(el => el === selected.value)
          this.keyword3.select(this.keywordsList3[indexOfSelectedKeyword + 1])
        }
      }
    })
    // setTimeout(() => {
    //   this.keyword1.select('soil')
    //   this.keyword2.select('electricity')
    //   this.keyword3.select('abundance')
    // })
  },
  methods: {
    rndShiftArray (array) {
      console.log(array)
      const shift = Math.floor(Math.random() * array.length)
      const copy = [...array]
      const removed = copy.splice(0, shift)
      copy.push(...removed)
      return copy
    },
    generateKeywordsList (list) {
      const keywords = []
      for (let i = 0; i < list.length; i++) {
        keywords.push({
          value: list[i],
          text: list[i]
        })
      }
      return keywords
    }
    // getFilteredKeywordsList (keyword) {
    //   if (keyword === 1) {
    //     return this.keywordsList.filter(el => el.value !== this.keyword2 && el.value !== this.keyword3)
    //   } else if (keyword === 2) {
    //     return this.keywordsList.filter(el => el.value !== this.keyword1 && el.value !== this.keyword3)
    //   } else if (keyword === 3) {
    //     return this.keywordsList.filter(el => el.value !== this.keyword1 && el.value !== this.keyword2)
    //   }
    // }
  }
}
</script>

<style lang="scss">
.select-wrap {
  position: relative;
  // top: 200px;
  height: 100%;
  // perspective: 1200px;
  text-align: center;
  overflow: hidden;
  // font-size: 20px;
  color: #ddd;
  &:before, &:after {
    position: absolute;
    z-index: 1;
    display: block;
    content: '';
    width: 100%;
    height: 50%;
  }
  &:before {
    top: 0;
    // background-image: linear-gradient(to bottom, rgba(1, 1, 1, 0.5), rgba(1, 1, 1, 0));
  }
  &:after {
    bottom: 0;
    // background-image: linear-gradient(to top, rgba(1, 1, 1, 0.5), rgba(1, 1, 1, 0));
  }

  .select-options {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 0;
    transform-style: preserve-3d;
    margin: 0 auto;
    display: block;
    transform: translateZ(-300px) rotateX(0deg);
    -webkit-font-smoothing: subpixel-antialiased;
    color: #000;
    list-style: none;
    .select-option {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50px;

      -webkit-font-smoothing: subpixel-antialiased;
      @for $i from 1 through 100 {
        &:nth-child(#{$i}) {
          transform: rotateX(-18deg * ($i - 1)) translateZ(300px);
        }
      }
    }
  }
}

.highlight {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  width: 100%;
  font-family: 'LaNordBold', Arial, sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  color: #000;
  background-color: #FFF;
  border-top: 1px solid #FFF;
  border-bottom: 1px solid #FFF;
  // font-size: 24px;
  overflow: hidden;
}
.highlight-list {
  // display: none;
  position: absolute;
  width: 100%;
  list-style-type: none;
  padding-left: 0;
}

.wheel-picker {
  // position: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%);
  perspective: 15000px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  width: 100%;
  height: calc(100vh - 210px);
  >div {
    flex: 1;
  }
  .select-wrap {
    font-size: 14px;
  }
  .highlight {
    font-size: 14px;
  }
}
.wheel-picker div:not(:last-child) .select-wrap {
  border-right: 1px solid #FFF;
}
.wheel-picker div:not(:last-child) .highlight {
  border-right: 1px solid #000;
}
</style>
