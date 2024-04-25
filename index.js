exports.aceAttribsToClasses = function(hook, context) {
    if (context.key === 'pageBreak') {
      return ['pageBreak'];
    }
  };
  
  exports.collectContentPre = function(hook, context) {
    const tname = context.tname;
    const state = context.state;
    const lineHasMarker = state.lineMarker === 1;
  
    if (tname === 'div' && lineHasMarker) {
      context.cc.doAttrib(state, 'pageBreak');
    }
  };

  exports.aceEditEvent = function(hook, context) {
    const PAGE_BREAK_AFTER_LINES = 50;
  
    if (context.callstack.docTextChanged && context.rep.lines.length() % PAGE_BREAK_AFTER_LINES === 0) {
      const line = context.rep.lines.length() - 1;
      const documentAttributeManager = context.documentAttributeManager;
  
      documentAttributeManager.setAttributeOnLine(line, 'pageBreak', 'true');
    }
  };