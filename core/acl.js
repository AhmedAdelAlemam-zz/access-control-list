// Main Class
class Acl {
  // global variables 
  constructor(){
    this.to = this.from;
    this.if = this.iff;
  }
  
  // creating our roles array
  createRole(role){
    cache.roles.push(role);
  }

  a(role){
    // if not a check it will create a new Map() for the role 
    cache.iff_call = false;
    if(cache.roles.includes(role)){
    if(!cache.rules.has(role)){
      cache.rules.set(role, new Map());
    }
      cache.last_role = role;
    }else {
      // if the role you try to create is not exist
      alert(`Please create role ${role} first`);
    }
      return cache.acl_inst;
  }
  can(verb){
    let last_role_map = cache.rules.get(cache.last_role);
      if(!cache.iff_call){
      if(!last_role_map.has(verb)){
      		last_role_map.set(verb, new Map());
    	}
    }
      cache.last_verb = verb;
      return cache.acl_inst;
    }
    from(url){
      cache.last_url = url;
      if(cache.iff_call){
        return cache.acl_inst.checkUrl(url);
      }else {
        let last_verb_map =
        cache.rules.get(cache.last_role).get(cache.last_verb);
        last_verb_map.set(url , new Map());
      }
      return cache.acl_inst;
    }
    when(func){
      let last_url_map = cache.rules.get(cache.last_role).get(cache.last_verb).get(cache.last_url);
      last_url_map.set(func , 1);
    }
    iff(role){
      cache.iff_call = true;
      cache.last_role = role;
      return cache.acl_inst;
    }
  	checkUrl(url){
      if(cache.rules.has(cache.last_role) && cache.rules.get(cache.last_role).has(cache.last_verb) && cache.rules.get(cache.last_role).get(cache.last_verb).has(url)){
        return true;
         }else {
           return false;
         }
  	}
  }
  //globale variables 
  let cache = {
    roles: [],
    rules: new Map(),
    last_role: '',
    last_verb: '',
    last_url: '',
    iff_call: false,
    acl_inst: new Acl()
  };

  //our acl instace  
  let acl = cache.acl_inst;
  let a = Acl.prototype.a;
  export { acl as default, a, a as an, acl as check };