const init = () => {

  const updateClass = projectCass => {
    const body = document.querySelector('body');
    const currentClass = body.classList[0];
    body.classList.replace(currentClass, projectCass);
  };

  // Resume main timeline
  document
    .querySelector('.project00 .button')
    .addEventListener('click', (e) => {
      e.preventDefault();
      tlProjects.resume();
    });

  const projects = document.querySelector('.projects');
  const projectImageBefore = CSSRulePlugin.getRule(".project-image:before");
  const projectImageAfter = CSSRulePlugin.getRule(".project-image:after");

  // main projects timeline
  const tlProjects = new TimelineMax();
  tlProjects
    .set(projects, { autoAlpha: 1 })

  const pauseProjects = (projectClass, tlProjectLoader) => {
    tlProjects.pause();
    if (projectClass !== 'project00') {
      tlProjectLoader.seek(0);
      tlProjectLoader.play();
    }
  };

  const resumeProjects = () => {
    tlProjects.resume();
  };

  const allProjects = document.querySelectorAll('.project');
  const tlProject = new TimelineMax({ repeat: -1, repeatDelay: 2 });

  allProjects.forEach(project => {

    const projectClass = project.classList[1];

    const pixel = project.querySelectorAll('.pixel');
    const pixels = project.querySelector('.project-pixels');
    const projectTitle = project.querySelector('.project-title');
    const projectSubTitle = project.querySelector('.project-subtitle');
    const projectImage = project.querySelector('.project-image');

    // Project CTA
    const tlProjectsCTA = new TimelineMax();

    const projectLink = project.querySelector('.button-container');
    const projectLinkButton = project.querySelector('.button');
    const projectLinkSpan = project.querySelectorAll('.bp');
    const projectLinkText = project.querySelector('.bp-text');

    tlProjectsCTA
      .to(projectSubTitle, 0.3, {
        autoAlpha: 0,
        yPercent: 100,
        ease: Back.easeOut
      })
      .staggerFrom(projectLinkSpan, 0.3, {
        autoAlpha: 0,
        yPercent: -100,
        ease: Back.easeOut
      }, 0.1)
      .from(projectLinkText, 0.3, {
        autoAlpha: 0,
        x: '-100%',
        ease: Power4.easeInOut
      }, '-=0.2')

    //project loader
    const tlProjectLoader = new TimelineMax({ paused: true });
    const loader = project.querySelector('.loader');

    if (loader) {
      tlProjectLoader
        .to([projectImageBefore, projectImageAfter], 0.4, {
          cssRule: {
            opacity: '0'
          }
        })
        .fromTo(loader, 5, {
          strokeDasharray: 547, // circumferance of circle
          strokeDashoffset: 547
        }, {
            strokeDasharray: 547,
            strokeDashoffset: 0,
            ease: Power0.easeNone
          })
        .to(loader, 0.4, { autoAlpha: 0, onComplete: resumeProjects })
        .to([projectImageBefore, projectImageAfter], 0.4, {
          cssRule: { opacity: '1' }
        }, '-=0.4');
    }

    //project loader
    const tlCircles = new TimelineMax({ repeat: -1 });

    const getArgs = (elm, time, pos, offset) => {
      const base = [elm,
        time,
        { cssRule: pos, ease: Linear.easeNone },
      ];
      if (offset) {
        return [...base, offset];
      }
      return base;
    };

    const getBeforeArgs = (pos) => {
      return getArgs(projectImageBefore, 0.8, pos);
    };

    const getAfterArgs = (pos, offset) => {
      return getArgs(projectImageAfter, 0.7, pos, offset);
    };

    tlCircles
    .to(...getBeforeArgs({ top: '5px' }))
    .to(...getBeforeArgs({ left: '5px' }))
    .to(...getBeforeArgs({ top: '-5px' }))
    .to(...getBeforeArgs({ left: '-5px' }))
    .to(...getAfterArgs({ bottom: '6px' }), '0')
    .to(...getAfterArgs({ right: '6px' }), '0.7')
    .to(...getAfterArgs({ bottom: '-6px' }), '1.1')
    .to(...getAfterArgs({ right: '-6px' }), '1.5')


    // Creat a project timeline
    tlProject
      .set(project, { zIndex: 1 })
      .set([projectTitle, projectSubTitle], { autoAlpha: 0 })
      .fromTo(projectImage, 0.4, {
        autoAlpha: 0,
        xPercent: -200
      }, {
          autoAlpha: 1,
          xPercent: -10,
          ease: Power4.easeInOut,
          onStart: updateClass,
          onStartParams: [projectClass]
        })
      .add('imageIn') // add label
      .staggerFromTo(pixel, 0.3, {
        autoAlpha: 0,
        x: '-=10'
      }, {
          autoAlpha: 1,
          x: 0,
          ease: Power4.easeInOut
        }, 0.02, '-=0.2') // bring earlier in timeline
      .add('pixelsIn')
      .fromTo(projectTitle, 0.7, {
        autoAlpha: 0,
        xPercent: '-50'
      }, {
          autoAlpha: 1,
          xPercent: '-5',
          ease: Power4.easeInOut
        }, '-=0.4')
      .fromTo(projectSubTitle, 0.7, {
        autoAlpha: 0,
        xPercent: '-50'
      }, {
          autoAlpha: 1,
          xPercent: '-2',
          ease: Power4.easeInOut
        }, '-=0.5')
      .add('titleIn')
      // add CTA timeline
      .add(tlProjectsCTA, '+=2')
      .to(projectTitle, 4.3, {
        xPercent: '+=5',
        ease: Linear.easeNone
      }, 'titleIn-=0.1')
      .to(projectSubTitle, 4.3, {
        xPercent: '+=2',
        ease: Linear.easeNone
      }, 'titleIn-=0.1')
      .add('titleOut')
      .to(projectImage, 5, {
        xPercent: '0',
        ease: Linear.easeNone,
        onComplete: pauseProjects,
        onCompleteParams: [projectClass, tlProjectLoader]
      }, 'imageIn')
      .add('imageOut')
      .to(pixels, 4.1, {
        x: '-5',
        ease: Linear.easeNone
      }, 'pixelsIn') // start animating out when 'pixelsIn'
      .to([projectTitle, projectSubTitle, projectLink], 0.5, {
        autoAlpha: 0,
        xPercent: '+=10' // move x to the right by 10
      }, 'titleOut')
      .to(projectImage, 0.4, {
        autoAlpha: 0,
        xPercent: '+=80' // move x to the right by 10
      }, 'imageOut')

    tlProjects.add(tlProject);
  });
};

window.addEventListener('load', init);