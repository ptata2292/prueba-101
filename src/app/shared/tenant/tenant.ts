import { environment } from '../../../environments/environment';
import { config } from '../config';
import { confirationClasses } from "./configuration";


export function getTenantName() {
    const logo = environment.tenants;
    for(const l of logo) {
        const urls = l.urls;
        for(const url of urls) {
            if(window.location.href.toLowerCase().indexOf('/' + url.toLowerCase()) !== -1) {
                if(confirationClasses[l.tenant] != null) {
                    return l.tenant;
                } else {
                    return "defaultTenant";
                }
            }
        }
    }
    return "defaultTenant";
}

export function getTenant() {
    const tenantName = getTenantName();
    if(confirationClasses[tenantName] != null) {
        return confirationClasses[tenantName];
    } else {
        return confirationClasses.defaultTenant;
    }
}

export function getLogo(isWhiteBackgroundLog = false, favIcon = false) {
    const tenantConfig = getTenant();
    if(tenantConfig != null) {
        if(favIcon) {
            return "assets/media/Logos/" + tenantConfig.favIcon;
        } else {
            return "assets/media/Logos/" + (isWhiteBackgroundLog ? tenantConfig.whiteLogo : tenantConfig.logo);
        }
    }
    if(favIcon) {
        return "assets/media/Logos/linkrezFavIcon.ico";
    } else {
        return "assets/media/Logos/" + (isWhiteBackgroundLog ? "linkrezWhite.svg" : "linkrez.svg");
    }
}

export function getTitle() {
    const tenantConfig = getTenant();
    return tenantConfig.title || "Linkrez";
}

export function getTenantLoginLogos() {
    const tenantConfig = getTenant();
    return tenantConfig.loginLogos || [];
}

export function getTenantTheme() {
    const tenantConfig = getTenant();
    return tenantConfig.theme || "default";
}

export function getTenantModule() {
    const tenantConfig = getTenant();
    return tenantConfig.module;
}

export function getAuthorizedModules() {
    const tenantConfig = getTenant();
    return tenantConfig.authorizedModules;
}

export function getTotalModels() {
    const tenantConfig = getTenant();
    return tenantConfig.modulesOrder;
}

export function getTotalConfigModels() {
    let models = [];
    for( let objectRoutingObj in config.objectRouting) {
      models.push(config.objectRouting[objectRoutingObj].URLLink);
    }
    return models;
}

export function getEnvironment() {
  return getTenant().env || 'stg';
}

export function getHotelsAPI() {
  return environment.hotelsApiEndpoint[getEnvironment()];
}

export function getAirAPI() {
  return environment.airApiEndpoint[getEnvironment()];
}

export function getCarsAPI() {
  return environment.carRentalApiEndpoint[getEnvironment()];
}

export function getReservationType() {
  return environment.hotelTarget[getEnvironment()];
}
