const html = require('html-template-tag');
const layout = require('./layout');

module.exports = () =>
  layout(html`
    <h3>Add a Page</h3>
    <hr />
    <form method="POST" action="/wiki/">
      <div class="form-group'">
        <label for="title" class="col-sm-2 control-label">Author</label>
        <div class="col-sm-10">
          <input
            id="author"
            name="author"
            type="text"
            class="form-control"
            placeholder="author name"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="title" class="col-sm-2 control-label">Email</label>
        <div class="col-sm-10">
          <input
            id="email"
            name="email"
            type="text"
            class="form-control"
            placeholder="author email"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="title" class="col-sm-2 control-label">Page Title</label>
        <div class="col-sm-10">
          <input id="title" name="title" type="text" class="form-control"
          placeholder='title'/>
        </div>
      </div>

      <div class="form-group">
        <label for="content" class="col-sm-2 control-label">Content</label>
        <div class="col-sm-10">
          <input id="title" name="content" type="text" class="form-control"
          placeholder="content"/>
        </div>
      </div>

      <div class="form-group">
        <label for="Page Status" class="col-sm-2 control-label"
          >Page Status</label
        >
        <div class="col-sm-10">
          <input id="status" name="status" type="text" class="form-control placeholder="page status"/>
        </div>
      </div>

      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">submit</button>
      </div>
    </form>
  `);
