<template>
    <CommentPage :all-comments="allComments"
                :current-page="currentPage"
                :sorted-by="sortedBy"
                :fetch-comments="fetchComments"
                :delete-comment="deleteComment"
                :edit-comment="editComment"
                :submit-comment="submitComment"
                :change-current-page="changeCurrentPage"
                :sort-comments="sortComments"
                />
</template>
<script>


import CommentPage from "./components/CommentPage/CommentPage.vue";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
    components: {
        CommentPage,
    },
    computed: {
        ...mapGetters(['allComments', 'currentPage', 'sortedBy']),
    },
    methods: {
        ...mapActions(['fetchComments', 'deleteComment', 'editComment', "submitComment", "changeCurrentPage"]),
        ...mapMutations(['sortComments']),
    },
    created() {
        this.fetchComments();
    },
};

</script>
