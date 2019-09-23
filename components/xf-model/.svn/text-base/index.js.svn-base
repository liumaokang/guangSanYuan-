Component({
    properties: {
        confirmShow: Boolean,
        title: {
            type: String,
            value: "提示"
        },
        content: {
            type: String,
            value: "内容"
        },
        confirmTxt: {
            type: String,
            value: "确认"
        },
        cancelTxt: {
            type: String,
            value: "取消"
        }
    },
    data: {},
    methods: {
        toggleConfirm: function() {
            this.triggerEvent("cancel");
        },
        clickConfirm: function() {
            this.triggerEvent("confirm");
        }
    }
});