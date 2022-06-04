<template>
  <div id="correction-form">
    <!-- Dropdown Kurse -->
    <div class="container my-5">
      <p>Bitte kurs wählen</p>
      <select class="mdb-select md-form" searchable="Search here..">
        <option value="" disabled selected>Kurs wählen</option>
        <option value="1">Mathe</option>
        <option value="2">Informatik</option>
        <option value="3">Requirements Engineering</option>
        <option value="3">IT-Recht</option>
        <option value="3">BWL</option>
      </select>
    </div>
    <hr>
    <!-- Medium auswählen -->
  <p>Bitte Medium wählen!</p>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="defaultCheck1"
      />
      <label class="form-check-label" for="defaultCheck1"> Video </label>
      <label for="input-text-video" class="form-check-label-lokalisierung"
        >Video + Zeitpunkt</label
      >
      <input
        type="text"
        class=""
        id="input-text-video"
        placeholder="Videoname"
      />
      <input
        type="time"
        class=""
        id="input-time-video"
        placeholder="Zeitpunkt"
      />
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="defaultCheck2"
      />
      <label class="form-check-label" for="defaultCheck2"> PDF </label>
      <label for="input-pdf-seitenzahl" class="form-check-label-lokalisierung"
        >Seitenzahl</label
      >
      <input
        type="number"
        class=""
        id="input-pdf-seitenzahl"
        placeholder="Seitenzahl"
      />
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="defaultCheck2"
      />
      <label class="form-check-label" for="defaultCheck2"> Skript </label>
      <label for="input-seitenzahl" class="form-check-label-lokalisierung"
        >Seitenzahl</label
      >
      <input
        type="Number"
        class=""
        id="input-seitenzahl"
        placeholder="Seitenzahl"
      />
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="defaultCheck2"
      />
      <label class="form-check-label" for="defaultCheck2"> Podcast </label>
      <label for="input-text-podcast" class="form-check-label-lokalisierung"
        >Podcast</label
      >
      <input
        type="text"
        class=""
        id="input-text-podcast"
        placeholder="Podcastname"
      />
      <input
        type="time"
        class=""
        id="input-time-podcast"
        placeholder="Zeitpunkt"
      />
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="defaultCheck2"
      />
      <label class="form-check-label" for="defaultCheck2"> Shortcast </label>
      <label for="input-text-shortcast" class="form-check-label-lokalisierung"
        >Shortcastname</label
      >
      <input
        type="text"
        class=""
        id="input-text-shortcast"
        placeholder="Shortcastname"
      />
      <input
        type="time"
        class=""
        id="input-time-shortcast"
        placeholder="Zeitpunkt"
      />
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="defaultCheck2"
      />
      <label class="form-check-label" for="defaultCheck2"> Repetitorium </label>
      <label
        for="input-seitenzahl-repetitorium"
        class="form-check-label-lokalisierung"
        >Seitenzahl</label
      >
      <input
        type="Number"
        class=""
        id="input-seitenzahl-repetitorium"
        placeholder="Seitenzahl"
      />
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="defaultCheck2"
      />
      <label class="form-check-label" for="defaultCheck2">
        Musterklausur
      </label>
      <label
        for="input-name-musterklausur"
        class="form-check-label-lokalisierung"
        >Name + Frage</label
      >
      <input
        type="text"
        class=""
        id="input-name-musterklausur"
        placeholder="Name Musterklausur"
      />
      <input
        type="text"
        class=""
        id="input-frage-musterklausur"
        placeholder="Frage..."
      />
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="defaultCheck2"
      />
      <label class="form-check-label" for="defaultCheck2"> Online-Test </label>
      <label
        for="input-kapitel-online-test"
        class="form-check-label-lokalisierung"
        >Kapitel + Frage</label
      >
      <input
        type="text"
        class=""
        id="input-kapitel-online-test"
        placeholder="Kapitel"
      />
      <input
        type="text"
        class=""
        id="input-frage-online-test"
        placeholder="Frage..."
      />
    </div>
    <hr>
    <!-- Priorität des Fehlers wählen --> 
    <div class="form-group">
      <p>Fehlerkategorien</p>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadioNiedrig"
          value="Niedrig"
        />
        <label class="form-check-label" for="inlineRadioNiedrig">Verbesserung</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadioMittel"
          value="Mittel"
        />
        <label class="form-check-label" for="inlineRadioMittel">Inhaltlicher Fehler</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadioHoch"
          value="Hoch"
        />
        <label class="form-check-label" for="inlineRadioHoch">Hoch</label>
      </div>
    </div>

    <hr>

    <form>
      <p>Datei auswählen</p>
  <div class="form-group file-hover">   
    <input type="file" class="form-control-file file-hover" id="exampleFormControlFile1">
  </div>
</form>
    <hr>

    <!-- Textfeld Sonstige Bemerkungen -->
    <div class="form-group">
      <label for="textarea-bemerkungen">Zusätzliche Bemerkungen</label>
      <textarea
        class="form-control"
        id="textarea-bemerkungen"
        rows="3"
      ></textarea>
    </div>

        <div class="col-md-12 text-center mt-2">
    <button type="button" class="btn btn-primary">Primary</button>
</div>
    

  </div>
</template>

<script>
export default {};
</script>

<style>
#correction-form {
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
  width: 90%;
  max-width: 100%;
  overflow: auto;
  border: 3px solid black;
  margin: 80px auto;
  border-radius: 20px;
  box-shadow: 10px 10px 10px 10px rgba(4, 3, 5, 0.1); 
  background: white;
}

.file-hover:hover{
  cursor: pointer;
}






</style>