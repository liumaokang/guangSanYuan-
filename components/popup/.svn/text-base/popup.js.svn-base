Component({
    properties: {
        show: Boolean,
        overlayStyle: String,
        overlay: {
            type: Boolean,
            value: !0
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: !0
        },
        position: {
            type: String,
            value: "center"
        }
    },
    data: {},
    methods: {
        onClickOverlay: function() {
            this.triggerEvent("click-overlay"), this.data.closeOnClickOverlay && this.triggerEvent("close");
        }
    }
});