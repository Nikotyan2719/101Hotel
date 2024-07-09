<template>
    <div class="CommentPage">
        <div class="CommentPage__inner">
            <div class="CommentPage__sort-buttons">
                <SortButton
                    v-for="button in sortButtons"
                    :key="button.criterion"
                    :text="button.text"
                    :criterion="button.criterion"
                    :direction="sortedBy.criterion === button.criterion ? sortedBy.direction : 'asc'"
                    :on-sort="sortComments"
                    :sorted-by="sortedBy"
                />
            </div>
            <ul class="CommentPage__list">
                <Comment v-for="comment in currentComments" v-bind="comment"
                         :key="comment.id"
                         :delete-comment="deleteComment"
                         :edit-comment="editComment"/>
            </ul>
            <InputComment :submit-comment="submitComment"/>
            <Pagination :pages="pages" :currentPage.sync="currentPage" :change-current-page="changeCurrentPage"/>
        </div>
    </div>
</template>

<script>
import Comment from '../Comment/Comment.vue';
import InputComment from '../InputComment/InputComment.vue';
import Pagination from '../Pagination/Pagination.vue';
import SortButton from '../SortButton/SortButton.vue';

export default {
    components: {
        Pagination,
        Comment,
        InputComment,
        SortButton,
    },
    props: {
        allComments: {
            type: Array,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
        sortedBy: {
            type: Object,
            required: true,
        },
        submitComment:{
            type: Function,
            required: true,
        },
        fetchComments: {
            type: Function,
            required: true,
        },
        deleteComment: {
            type: Function,
            required: true,
        },
        editComment: {
            type: Function,
            required: true,
        },
        sortComments: {
            type: Function,
            required: true,
        },
        changeCurrentPage:{
            type: Function,
            required: true,
        }
    },
    computed: {
        currentComments() {
            const start = (this.currentPage - 1) * 3;
            const end = start + 3;
            return this.allComments.slice(start, end);
        },
        pages() {
            return Math.ceil(this.allComments.length / 3);
        },
        sortButtons() {
            return [
                { text: 'Сортировка по ID', criterion: 'id' },
                { text: 'Сортировка по дате', criterion: 'date' },
            ];
        },
    },
    mounted() {
        this.fetchComments('fetchComments');
    },
};
</script>


<style>
.CommentPage {
    display: flex;
    justify-content: center;
    max-width: 960px;
    height: 100vh;
    width: 100%;
    margin: auto auto;
    padding: 20px 40px;
}

.CommentPage__inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
}

.CommentPage__list {
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: 16px;
}


.CommentPage__sort-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
}

@media (max-width: 768px) {
    .CommentPage {
        display: flex;
        justify-content: center;
        max-width: 960px;
        width: 100%;
        margin: auto auto;
        padding: 10px 20px;
    }
}
</style>
