<template>
    <form class="comment-form" @submit.prevent="btnSubmitComment">
        <div class="comment-form__row">
            <input
                v-model="newComment.name"
                class="comment-form__author"
                required
                placeholder="Введите имя"
            >
            <div class="comment-form__date">
                <VueDatePicker v-model="newComment.date" required/>
            </div>
        </div>
        <div class="comment-form__textarea-row">
            <textarea
                v-model="newComment.text"
                class="comment-form__text"
                required
                placeholder="Ваш комментарий"
            />
            <button class="comment-form__button" type="submit">Отправить</button>
        </div>
    </form>
</template>

<script>
import VueDatePicker from "vue2-datepicker";

export default {
    components: {
        VueDatePicker
    },
    props: {
        submitComment: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            newComment: {name: '', text: '', date: new Date()},
        }
    },
    methods: {
        btnSubmitComment() {
            this.submitComment(this.newComment);
            this.newComment.name = '';
            this.newComment.text = '';
            this.newComment.date = new Date();
        },
    }
}

</script>

<style>
.comment-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 8px;
    border: 1px solid #d1e7dd;
    padding: 20px;
    background-color: #f3f9f7;
}

.comment-form__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.comment-form__author {
    flex-grow: 1;
    outline: none;
    border: none;
    border-bottom: 1px solid #d1e7dd;
    padding: 10px;
    font-size: 14px;
    color: #495057;
    background-color: transparent;
}

.comment-form__date {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #6c757d;
    font-size: 14px;
}
.comment-form__textarea-row {
    display: flex;
    align-items: end;
    gap: 20px;
}
.comment-form__text {
    outline: none;
    border: none;
    border-bottom: 1px solid #d1e7dd;
    width: 100%;
    padding: 10px;
    font-size: 14px;
    color: #495057;
    background-color: transparent;
    resize: none;
}

.comment-form__text::placeholder {
    color: #6c757d;
}

.comment-form__button {
    background-color: #4CAF50;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}


.comment-form__button:hover {
    background-color: #388E3C;
}

@media (max-width: 768px) {
    .comment-form__row {
        flex-direction: column;
        align-items: stretch;
    }

    .comment-form__author {
        width: 100%;
    }
}


</style>
