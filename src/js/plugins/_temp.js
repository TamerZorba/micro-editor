
    // microEditor.plugins.register("h1", function() {
    //     this.create.button("H1", function() {
    //             this.register.action('h1');
    //         })
    //         .highlight("formatblock", "h1");
    // });

    // microEditor.plugins.register("h2", function() {
    //     this.create.button("H2", function() {
    //             this.register.action('h2');
    //         })
    //         .highlight("formatblock", "h2");
    // });

    // microEditor.plugins.register("p", function() {
    //     this.create.button(function() {
    //             this.register.action('p');
    //         })
    //         .icon("fa fa-paragraph")
    //         .highlight("formatblock", "p")
    // });


    
    /*
    var script = document.createElement('script');
    script.src = "js/reco.js";
    document.head.appendChild(script);

    microEditor.plugins.register("reco", function() {
        var update = function(e) {
            if (reco.started) {
                e.icon("fa fa-microphone-slash");
            } else {
                e.icon("fa fa-microphone");
            }
        }
        var btn = this.create.button(function(e) {
            reco.toogle();
            update(e);
        }).icon("fa fa-microphone");

        var _self = this;
        reco.init(this.options.recolan || "en-US");
        reco.listen("last", function(o) {
            _self.register.action("insertText", o);
            update(btn);
        });
        reco.listen("listening", function() {
            // btn.icon("fa fa-heartbeat");
            btn.icon("fa fa-circle-o-notch fa-spin");
        });

    }, function() {
        this.register.toolbar("reco");
    });
    */



    // microEditor.plugins.register("twitter", function() {
    //     this.create.button(function(e) {
    //         console.log("hello twitter");
    //     }).icon("fa fa-twitter");
    // });



    // microEditor.plugins.register("facebook", function() {
    //     this.create.input("range", function(e) {
    //          // testing
    //         this.register.action('fontSize', Math.round(e.srcElement.value / 100 * 7));
    //     }).icon("fa fa-facebook");
    // });

    // microEditor.plugins.register("math", function() {
    //     this.create.button(function(e) {
    //         console.log("hello math");
    //     }).icon("fa fa-percent");
    // }, function() {
    //     this.register.toolbar("math");
    // });