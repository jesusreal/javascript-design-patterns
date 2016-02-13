$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        }, fun
        fun fun
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                dateSubmitted: Date.now()
            });
            view.render();
        },

        getNotes: function() {
            var notes = model.getAllNotes();
            notes.forEach(function(note) {
               var date = new Date(note.dateSubmitted);
               note.dateSubmitted = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
            });
            return notes;
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        note.content + ' <span class="note-date">' + note.dateSubmitted + "</span>" +
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});