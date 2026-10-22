(() => {
  // HTML-страница передает обозначение решетки
  // через атрибут data-lattice.
  const currentScript = document.currentScript;
  const latticeId = currentScript
    ? currentScript.dataset.lattice
    : null;

  // =========================================================
  // 1. ПАРАМЕТРЫ РЕШЕТОК
  // Длины условные, углы заданы в градусах.
  // =========================================================

  const lattices = {
    aP: {
      title: "Триклинная примитивная",
      system: "Триклинная",
      centering: "P",
      a: 2.4,
      b: 2.8,
      c: 3.2,
      alpha: 75,
      beta: 85,
      gamma: 70
    },

    mP: {
      title: "Моноклинная примитивная",
      system: "Моноклинная",
      centering: "P",
      a: 2.4,
      b: 2.8,
      c: 3.2,
      alpha: 90,
      beta: 110,
      gamma: 90
    },

    mC: {
      title: "Моноклинная базоцентрированная",
      system: "Моноклинная",
      centering: "C",
      a: 2.4,
      b: 2.8,
      c: 3.2,
      alpha: 90,
      beta: 110,
      gamma: 90
    },

    oP: {
      title: "Орторомбическая примитивная",
      system: "Орторомбическая",
      centering: "P",
      a: 2.0,
      b: 2.6,
      c: 3.2,
      alpha: 90,
      beta: 90,
      gamma: 90
    },

    oC: {
      title: "Орторомбическая базоцентрированная",
      system: "Орторомбическая",
      centering: "C",
      a: 2.0,
      b: 2.6,
      c: 3.2,
      alpha: 90,
      beta: 90,
      gamma: 90
    },

    oI: {
      title: "Орторомбическая объемноцентрированная",
      system: "Орторомбическая",
      centering: "I",
      a: 2.0,
      b: 2.6,
      c: 3.2,
      alpha: 90,
      beta: 90,
      gamma: 90
    },

    oF: {
      title: "Орторомбическая гранецентрированная",
      system: "Орторомбическая",
      centering: "F",
      a: 2.0,
      b: 2.6,
      c: 3.2,
      alpha: 90,
      beta: 90,
      gamma: 90
    },

    tP: {
      title: "Тетрагональная примитивная",
      system: "Тетрагональная",
      centering: "P",
      a: 2.2,
      b: 2.2,
      c: 3.4,
      alpha: 90,
      beta: 90,
      gamma: 90
    },

    tI: {
      title: "Тетрагональная объемноцентрированная",
      system: "Тетрагональная",
      centering: "I",
      a: 2.2,
      b: 2.2,
      c: 3.4,
      alpha: 90,
      beta: 90,
      gamma: 90
    },

    hP: {
      title: "Гексагональная примитивная",
      system: "Гексагональная",
      centering: "P",
      a: 2.4,
      b: 2.4,
      c: 3.4,
      alpha: 90,
      beta: 90,
      gamma: 120
    },

    hR: {
      title: "Ромбоэдрическая",
      system: "Тригональная",
      centering: "R",
      a: 2.6,
      b: 2.6,
      c: 2.6,
      alpha: 75,
      beta: 75,
      gamma: 75
    },

    cP: {
      title: "Кубическая примитивная",
      system: "Кубическая",
      centering: "P",
      a: 2.6,
      b: 2.6,
      c: 2.6,
      alpha: 90,
      beta: 90,
      gamma: 90
    },

    cI: {
      title: "Кубическая объемноцентрированная",
      system: "Кубическая",
      centering: "I",
      a: 2.6,
      b: 2.6,
      c: 2.6,
      alpha: 90,
      beta: 90,
      gamma: 90
    },

    cF: {
      title: "Кубическая гранецентрированная",
      system: "Кубическая",
      centering: "F",
      a: 2.6,
      b: 2.6,
      c: 2.6,
      alpha: 90,
      beta: 90,
      gamma: 90
    }
  };

  // =========================================================
  // 2. ПРИМЕРЫ ВЕЩЕСТВ
  // Это примеры решеток Браве, а не данные для построения
  // полной атомной структуры вещества.
  // =========================================================

  const examples = {
    aP: {
      name: "Медный купорос",
      formula: "CuSO₄·5H₂O",
      spaceGroup: "P−1",
      description:
        "Пентагидрат сульфата меди. При обычных условиях " +
        "имеет триклинную примитивную решетку."
    },

    mP: {
      name: "Бадделеит — моноклинный диоксид циркония",
      formula: "ZrO₂",
      spaceGroup: "P2₁/c",
      description:
        "Моноклинная модификация диоксида циркония, " +
        "устойчивая при обычных температуре и давлении."
    },

    mC: {
      name: "Гипс",
      formula: "CaSO₄·2H₂O",
      spaceGroup: "C2/c",
      description:
        "Дигидрат сульфата кальция. Имеет моноклинную " +
        "базоцентрированную решетку."
    },

    oP: {
      name: "Арагонит",
      formula: "CaCO₃",
      spaceGroup: "Pnma",
      description:
        "Орторомбическая модификация карбоната кальция. " +
        "При другом выборе осей используется обозначение Pmcn."
    },

    oC: {
      name: "Альфа-галлий",
      formula: "Ga",
      spaceGroup: "Cmce",
      description:
        "Обычная твердая модификация галлия при атмосферном " +
        "давлении. Старое обозначение группы — Cmca."
    },

    oI: {
      name: "Дителлурид урана",
      formula: "UTe₂",
      spaceGroup: "Immm",
      description:
        "При обычных условиях имеет орторомбическую " +
        "объемноцентрированную решетку."
    },

    oF: {
      name: "Альфа-сера",
      formula: "S₈",
      spaceGroup: "Fddd",
      description:
        "Ромбическая сера — устойчивая при комнатной температуре " +
        "модификация серы. Структура содержит молекулы S₈."
    },

    tP: {
      name: "Рутил",
      formula: "TiO₂",
      spaceGroup: "P4₂/mnm",
      description:
        "Одна из кристаллических модификаций диоксида титана. " +
        "Имеет тетрагональную примитивную решетку."
    },

    tI: {
      name: "Бета-олово — белое олово",
      formula: "Sn",
      spaceGroup: "I4₁/amd",
      description:
        "Металлическая модификация олова, устойчивая при " +
        "атмосферном давлении примерно от 13,2 °C до плавления."
    },

    hP: {
      name: "Магний",
      formula: "Mg",
      spaceGroup: "P6₃/mmc",
      description:
        "Имеет гексагональную плотную упаковку: гексагональную " +
        "примитивную решетку с двухатомным базисом."
    },

    hR: {
      name: "Кальцит",
      formula: "CaCO₃",
      spaceGroup: "R−3c",
      description:
        "Тригональная модификация карбоната кальция " +
        "с ромбоэдрической решеткой Браве."
    },

    cP: {
      name: "Хлорид цезия",
      formula: "CsCl",
      spaceGroup: "Pm−3m",
      description:
        "При обычных условиях имеет кубическую примитивную " +
        "решетку с двухатомным базисом. Это не ОЦК-решетка: " +
        "в вершинах и центре атомной структуры находятся " +
        "ионы разных элементов."
    },

    cI: {
      name: "Альфа-железо",
      formula: "Fe",
      spaceGroup: "Im−3m",
      description:
        "При комнатной температуре имеет " +
        "объемноцентрированную кубическую решетку."
    },

    cF: {
      name: "Медь",
      formula: "Cu",
      spaceGroup: "Fm−3m",
      description:
        "При обычных условиях имеет " +
        "гранецентрированную кубическую решетку."
    }
  };

  // =========================================================
  // 3. ЗАГРУЗКА БИБЛИОТЕК
  // Используем обычные script-файлы для запуска
  // HTML-страниц двойным щелчком.
  // =========================================================

  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");

      script.src = url;
      script.onload = resolve;

      script.onerror = () => {
        reject(new Error("Не удалось загрузить библиотеку: " + url));
      };

      document.head.appendChild(script);
    });
  }

  // =========================================================
  // 4. ПОДГОТОВКА СТРАНИЦЫ
  // =========================================================

  async function start() {
    document.body.style.cssText = `
      margin: 0;
      overflow: hidden;
      background: #172033;
      color: white;
      font-family: Arial, sans-serif;
    `;

    const style = document.createElement("style");

    style.textContent = `
      canvas {
        display: block;
        touch-action: none;
      }

      #bravais-panel {
        position: fixed;
        top: 12px;
        left: 12px;
        width: min(390px, calc(100vw - 24px));
        max-height: calc(100vh - 24px);
        overflow-y: auto;
        box-sizing: border-box;
        padding: 16px;
        border-radius: 12px;
        background: rgba(10, 17, 29, 0.9);
        color: #ffffff;
        line-height: 1.5;
        z-index: 1;
      }

      #bravais-panel h2 {
        margin: 0 0 10px;
        font-size: 20px;
      }

      #bravais-panel p {
        margin: 8px 0;
      }

      #bravais-panel .example {
        margin-top: 14px;
        padding: 12px;
        border-left: 3px solid #65bdff;
        border-radius: 6px;
        background: rgba(101, 189, 255, 0.12);
      }

      #bravais-panel .small {
        font-size: 12px;
        color: #bccbdd;
      }

      #bravais-panel button {
        padding: 8px 14px;
        margin-top: 8px;
        border: 0;
        border-radius: 6px;
        background: #65bdff;
        color: #102033;
        cursor: pointer;
        font: inherit;
      }

      #bravais-panel button:hover {
        background: #94d1ff;
      }

      @media (max-width: 700px) {
        #bravais-panel {
          max-height: 35vh;
          font-size: 13px;
        }

        #bravais-panel h2 {
          font-size: 17px;
        }
      }
    `;

    document.head.appendChild(style);

    const panel = document.createElement("div");
    panel.id = "bravais-panel";
    document.body.appendChild(panel);

    const config = lattices[latticeId];

    if (!config) {
      panel.textContent =
        "Неизвестная решетка. Проверь атрибут data-lattice " +
        "в HTML-файле. Например: data-lattice=\"cI\".";
      return;
    }

    document.title = config.title;
    panel.textContent = "Загрузка трехмерной модели…";

    try {
      await loadScript(
        "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"
      );

      await loadScript(
        "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"
      );

      buildScene(config, panel);
    } catch (error) {
      console.error(error);

      panel.textContent =
        "Не удалось запустить трехмерную модель. " +
        "Проверь интернет-соединение и поддержку WebGL в браузере. " +
        "Подробности: " + error.message;
    }
  }

  // =========================================================
  // 5. ПОСТРОЕНИЕ СЦЕНЫ
  // =========================================================

  function buildScene(config, panel) {
    const THREE = window.THREE;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#172033");

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );

    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    document.body.appendChild(renderer.domElement);

    // =======================================================
    // 6. СВЕТ, ЗАКРЕПЛЕННЫЙ НА КАМЕРЕ
    // Направление света относительно экрана не меняется
    // при вращении камеры вокруг решетки.
    // =======================================================

    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      0.7
    );

    scene.add(ambientLight);

    const light = new THREE.DirectionalLight(
      0xffffff,
      0.9
    );

    light.position.set(5, 8, 6);
    camera.add(light);

    const lightTarget = new THREE.Object3D();
    lightTarget.position.set(0, 0, -5);
    camera.add(lightTarget);

    light.target = lightTarget;

    // =======================================================
    // 7. ВЕКТОРЫ ЯЧЕЙКИ
    // alpha — угол между b и c.
    // beta  — угол между a и c.
    // gamma — угол между a и b.
    // =======================================================

    const radians = degrees => degrees * Math.PI / 180;

    const alpha = radians(config.alpha);
    const beta = radians(config.beta);
    const gamma = radians(config.gamma);

    const A = new THREE.Vector3(
      config.a,
      0,
      0
    );

    const B = new THREE.Vector3(
      config.b * Math.cos(gamma),
      config.b * Math.sin(gamma),
      0
    );

    const cx = config.c * Math.cos(beta);

    const cy = config.c * (
      Math.cos(alpha) -
      Math.cos(beta) * Math.cos(gamma)
    ) / Math.sin(gamma);

    const cz = Math.sqrt(Math.max(
      0,
      config.c * config.c - cx * cx - cy * cy
    ));

    const C = new THREE.Vector3(cx, cy, cz);

    // Перевод дробных координат в пространственные.
    function point(u, v, w) {
      return new THREE.Vector3()
        .addScaledVector(A, u)
        .addScaledVector(B, v)
        .addScaledVector(C, w);
    }

    const cell = new THREE.Group();
    scene.add(cell);

    // Помещаем центр ячейки в начало координат.
    const center = point(0.5, 0.5, 0.5);
    cell.position.copy(center).multiplyScalar(-1);

    // =======================================================
    // 8. КАРКАС ЯЧЕЙКИ
    // =======================================================

    const corners = [];

    for (let i = 0; i < 8; i++) {
      corners.push([
        (i >> 0) & 1,
        (i >> 1) & 1,
        (i >> 2) & 1
      ]);
    }

    const edgePoints = [];

    for (let i = 0; i < 8; i++) {
      for (const bit of [1, 2, 4]) {
        const j = i ^ bit;

        if (i < j) {
          edgePoints.push(
            point(...corners[i]),
            point(...corners[j])
          );
        }
      }
    }

    const frameGeometry = new THREE.BufferGeometry()
      .setFromPoints(edgePoints);

    const frameMaterial = new THREE.LineBasicMaterial({
      color: "#d4deed"
    });

    const frame = new THREE.LineSegments(
      frameGeometry,
      frameMaterial
    );

    cell.add(frame);

    // =======================================================
    // 9. УЗЛЫ РЕШЕТКИ
    // Все узлы одного цвета: они эквивалентны.
    // Размер шариков условный.
    // =======================================================

    const radius =
      Math.min(config.a, config.b, config.c) * 0.065;

    const sphereGeometry = new THREE.SphereGeometry(
      radius,
      28,
      20
    );

    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: "#65bdff",
      roughness: 0.3,
      metalness: 0.1
    });

    function addNode(fractionalPosition) {
      const node = new THREE.Mesh(
        sphereGeometry,
        sphereMaterial
      );

      node.position.copy(point(...fractionalPosition));
      cell.add(node);
    }

    corners.forEach(addNode);

    const extraNodes = [];

    // Объемная центрировка.
    if (config.centering === "I") {
      extraNodes.push([0.5, 0.5, 0.5]);
    }

    // C-центрировка: центры двух граней,
    // параллельных векторам A и B.
    if (config.centering === "C") {
      extraNodes.push(
        [0.5, 0.5, 0],
        [0.5, 0.5, 1]
      );
    }

    // Центры всех шести граней.
    if (config.centering === "F") {
      extraNodes.push(
        [0, 0.5, 0.5],
        [1, 0.5, 0.5],
        [0.5, 0, 0.5],
        [0.5, 1, 0.5],
        [0.5, 0.5, 0],
        [0.5, 0.5, 1]
      );
    }

    // Для hR используется примитивная ромбоэдрическая
    // ячейка, поэтому дополнительных узлов нет.
    extraNodes.forEach(addNode);

    // =======================================================
    // 10. ИНФОРМАЦИОННАЯ ПАНЕЛЬ
    // =======================================================

    const nodeCount = {
      P: 1,
      C: 2,
      I: 2,
      F: 4,
      R: 1
    }[config.centering];

    const centeringDescription = {
      P: "Примитивная",
      C: "Базоцентрированная (C)",
      I: "Объемноцентрированная (I)",
      F: "Гранецентрированная (F)",
      R: "Ромбоэдрическая, показана примитивная ячейка"
    }[config.centering];

    let note = "";

    if (latticeId === "hP") {
      note = `
        <p class="small">
          Показана примитивная ячейка-параллелепипед
          с углом γ = 120°, а не шестигранная призма.
          Для изображения плотной упаковки нужен
          дополнительный атомный базис.
        </p>
      `;
    }

    if (latticeId === "hR") {
      note = `
        <p class="small">
          Выбрана примитивная ромбоэдрическая ячейка:
          все ребра равны и все углы равны.
          В гексагональной установке эту же решетку
          описывают R-центрированной ячейкой,
          содержащей три узла с учетом их долей.
        </p>
      `;
    }

    const example = examples[latticeId];

    panel.innerHTML = `
      <h2>${config.title}</h2>

      <p>
        Обозначение: <strong>${latticeId}</strong><br>
        Система: ${config.system}<br>
        Тип: ${centeringDescription}
      </p>

      <p>
        <strong>Условные параметры ячейки</strong><br>
        a = ${config.a};
        b = ${config.b};
        c = ${config.c}<br>
        α = ${config.alpha}°;
        β = ${config.beta}°;
        γ = ${config.gamma}°
      </p>

      <p>
        Узлов на показанную ячейку
        с учетом долей: <strong>${nodeCount}</strong>.
      </p>

      ${note}

      <div class="example">
        <strong>Пример вещества</strong>

        <p>
          <a
  href="substance.html?id=${latticeId}&name=${encodeURIComponent(example.name)}&formula=${encodeURIComponent(example.formula)}"
  style="color: #65bdff; text-decoration: underline;"
>
  <a
  href="substance.html?id=${latticeId}&name=${encodeURIComponent(example.name)}&formula=${encodeURIComponent(example.formula)}"
  style="color: #65bdff; text-decoration: underline;"
>
  ${example.name}
</a><br>
</a><br>
          <strong>${example.formula}</strong>
        </p>

        <p>
          Пространственная группа:
          <strong>${example.spaceGroup}</strong>
        </p>

        <p>${example.description}</p>
      </div>

      <p class="small">
        Шарики обозначают узлы решетки Браве,
        а не полную атомную структуру вещества.
        Параметры ячейки и размеры шариков условные:
        они не соответствуют измеренным параметрам
        приведенного вещества.
      </p>

      <p>
        Вращение — мышью или пальцем.<br>
        Масштаб — колесиком или двумя пальцами.
      </p>

      <button id="reset-view" type="button">
        Сбросить вид
      </button>
    `;

    // =======================================================
    // 11. УПРАВЛЕНИЕ КАМЕРОЙ
    // =======================================================

    const controls = new THREE.OrbitControls(
      camera,
      renderer.domElement
    );

    controls.enableDamping = true;
    controls.enablePan = false;

    const size = Math.max(
      config.a,
      config.b,
      config.c
    );

    controls.minDistance = size * 0.8;
    controls.maxDistance = size * 12;

    function resetView() {
      camera.position.set(
        size * 1.8,
        size * 1.4,
        size * 2
      );

      controls.target.set(0, 0, 0);
      controls.update();
    }

    resetView();

    document.getElementById("reset-view")
      .addEventListener("click", resetView);

    // =======================================================
    // 12. ОБНОВЛЕНИЕ ИЗОБРАЖЕНИЯ
    // =======================================================

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
      camera.aspect =
        window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
      );

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
    });
  }

  // Запускаем программу после подготовки HTML-страницы.
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      start,
      { once: true }
    );
  } else {
    start();
  }
})();