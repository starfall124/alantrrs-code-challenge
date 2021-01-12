var dirs = (function () {
  var _root = {
    value: "_rootValue",
    children: [],
  };
  const loopDirectories = (callback) => {
    function goThrough(node) {
      callback(node);
      node.children.forEach((child) => {
        goThrough(child);
      });
    }
    goThrough(_root);
  };
  const addDirectory = (value, parentValue) => {
    if (!value) return;
    const newNode = {
      value,
      children: [],
    };
    if (_root === null) {
      _root = newNode;
      return;
    }
    loopDirectories((node) => {
      if (node.value === parentValue) {
        node.children.push(newNode);
      }
    });
  };
  const removeDirectory = (value) => {
    if (searchDirectory(value) === "Not Found") {
      console.log(
        "Cannot delete " + value,
        " --- " + value + " does not exists"
      );
    }
    loopDirectories((node) => {
      node.children.forEach((childNode, index) => {
        if (childNode.value === value) {
          node.children.splice(index, 1);
        }
      });
    });
  };
  const searchDirectory = (value) => {
    let returnNode = "Not Found";
    loopDirectories((node) => {
      if (node.value === value) {
        returnNode = node;
      }
    });
    return returnNode;
  };
  const displayDirectories = (parentValue) => {
    const parentNode =
      typeof parentValue === "string"
        ? searchDirectory(parentValue)
        : parentValue;
    let leafsRet = [];
    if (parentValue.children && !parentValue.children.length) {
      return parentValue;
    }
    parentNode.children.forEach((child) => {
      leafsRet.push(displayDirectories(child));
    });
    return leafsRet.flat();
  };
  const createCommand = (params) => {
    let parentNode = "_rootValue";
    let childNode = "";
    const dirs = params.split("/");
    if (dirs.length === 1) {
      childNode = dirs[0];
    } else if (dirs.length > 1) {
      parentNode = dirs[dirs.length - 2];
      childNode = dirs[dirs.length - 1];
    }
    addDirectory(childNode, parentNode);
  };
  const listCommand = () => {
    let depth = 0;
    function goThrough(node) {
      depth++;
      if (depth > 1) {
        console.log(Array(depth - 1).join("  "), node.value);
      }
      node.children.forEach((child) => {
        goThrough(child);
      });
      depth--;
    }
    goThrough(_root);
  };
  const moveCommand = (params) => {
    const from = params[0].split("/");
    const to = params[1].split("/");
    const fromObj = searchDirectory(from[from.length - 1]);
    const toObj = searchDirectory(to[to.length - 1]);
    if (fromObj === "Not Found") {
      console.log(
        "Cannot move " + params.join(" "),
        " --- " + params[0] + " does not exists"
      );
      return;
    }
    if (toObj === "Not Found") {
      console.log(
        "Cannot move " + params.join(" "),
        " --- " + params[1] + " does not exists"
      );
      return;
    }
    removeDirectory(from[from.length - 1]);
    loopDirectories((node) => {
      node.children.forEach((childNode, index) => {
        if (childNode.value === toObj.value) {
          node.children[index].children.push(fromObj);
        }
      });
    });
  };
  const deleteCommand = (params) => {
    const dirs = params.split("/");
    removeDirectory(dirs[dirs.length - 1]);
  };
  return {
    run: function (command) {
      console.log(command);
      const mainCommand = command.split(" ")[0];
      const params = command.split(" ").slice(1);
      switch (mainCommand) {
        case "CREATE":
          createCommand(params[0]);
          break;
        case "DELETE":
          deleteCommand(params[0]);
          break;
        case "MOVE":
          moveCommand(params);
          break;
        case "LIST":
          listCommand();
          break;
      }
    },
  };
})();

dirs.run("CREATE fruits");
dirs.run("CREATE vegetables");
dirs.run("CREATE grains");
dirs.run("CREATE fruits/apples");
dirs.run("CREATE fruits/apples/fuji");
dirs.run("LIST");
dirs.run("CREATE grains/squash");
dirs.run("MOVE grains/squash vegetables");
dirs.run("CREATE foods");
dirs.run("MOVE grains foods");
dirs.run("MOVE fruits foods");
dirs.run("MOVE vegetables foods");
dirs.run("LIST");
dirs.run("DELETE fruits/apples");
dirs.run("DELETE foods/fruits/apples");
dirs.run("LIST");
