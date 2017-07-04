<template>
<div>
    <div class="ui three doubling cards" v-if="activities.length > 0">
      <wekin-card-layout 
        :title="activity.title"
        :address="activity.address"
        :name="activity.Host.name"
        :imageUrl="activity.main_image.image[0]" 
        :rating="activity.rating_avg || 0"
        :reviewCount="activity.review_count"
        :activityKey="activity.activity_key" 
        :favorite="activity.Favorites" 
        v-if="activity.status == 3"
        v-for="activity in activities" 
        v-bind:key="activity.activity_key">
      </wekin-card-layout>
    </div>
    <p v-if="activities.length == 0" style="font-size: 15px;color: #979797;text-align:center">등록 된 위킨이 없습니다.</p>
</div>
</template>
<script>
import wekinCardLayout from 'components/WekinCardLayout.vue'
import api from 'api'

export default {
  components: {
    wekinCardLayout
  },
  data() {
    return {
      activities: []
    }
  },
  methods: {
    getMakerActivities() {
      api.getMakerActivities(this.$route.params.key)
        .then(json => this.activities = json.results)
        .catch(err => console.error(err))
    },
  },
  created () {
    this.getMakerActivities()
  }
}
</script>
