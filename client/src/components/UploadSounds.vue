<template>
  <form enctype="multipart/form-data"  v-if="isInitial || isSaving">
    <h1>Upload images</h1>
    <div class="dropbox">
      <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files, parent_id); fileCount = $event.target.files.length"
        accept="audio/*" class="input-file">
        <p v-if="isInitial">
          Drag your file(s) here to begin<br> or click to browse
        </p>
        <p v-if="isSaving">
          Uploading {{ fileCount }} files...
        </p>
    </div>
  </form>
</template>

<script>
import SoundService from '../services/SoundService'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'SoundUpload',
  props: ['parent_id'],
  components: {
  },
  data () {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'sound'
    }
  },
  computed: {
    isInitial () {
      console.log(this.currentStatus === STATUS_INITIAL + ' initial')
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      console.log(this.currentStatus === STATUS_SAVING + ' saving')
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      console.log(this.currentStatus === STATUS_SUCCESS + ' success')
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      console.log(this.currentStatus === STATUS_FAILED + ' failed ')
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    reset () {
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    save (formData, parentId) {
      this.currentStatus = STATUS_SAVING
      //  console.log(this.uploadedFiles)
      console.log(formData, parentId)
      SoundService.postSounds(formData, parentId)
        .then(x => {
          this.uploadedFiles = [].concat(x)
          this.currentStatus = STATUS_INITIAL
          this.$store.dispatch('getSoundboardsFromApi')
        })
        .catch(err => {
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
    },
    filesChange (fieldName, fileList, parentId) {
      const formData = new FormData()
      if (!fileList.length) return
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })

      this.save(formData, parentId)
    }
  },
  mounted () {
    this.reset()
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

@media only screen and (max-width: 600px) {

  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: #ECECEC;
    color: dimgray;
    padding: 10px 10px;
    min-height: 100px; /* minimum height */
    position: relative;
    cursor: pointer;
    margin: 0 25% 0 25%;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 50%;
    height: 100px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
}

@media only screen and (min-width: 600px) {

  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: #ECECEC;
    color: dimgray;
    padding: 10px 10px;
    min-height: 100px; /* minimum height */
    position: relative;
    cursor: pointer;
    margin: 0 25% 0 25%;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 50%;
    height: 100px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
}
</style>
