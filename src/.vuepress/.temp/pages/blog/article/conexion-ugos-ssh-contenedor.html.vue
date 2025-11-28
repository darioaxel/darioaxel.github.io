<template><div><h1 id="conexion-desde-contenedor-ssh-a-ugos-mediante-terminal" tabindex="-1"><a class="header-anchor" href="#conexion-desde-contenedor-ssh-a-ugos-mediante-terminal"><span>Conexión desde contenedor ssh a UGOS mediante terminal</span></a></h1>
<h2 id="dentro-del-contenedor-ejecuta" tabindex="-1"><a class="header-anchor" href="#dentro-del-contenedor-ejecuta"><span>Dentro del contenedor ejecuta:</span></a></h2>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>ip route | grep default</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>La salida será algo como:</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>default via 172.19.0.1 dev eth0</span></span>
<span class="line"><span>```                 ↑</span></span>
<span class="line"><span>Esta IP (172.19.0.1) es el NAS en la red Docker</span></span>
<span class="line"><span>Conéctate usando esa IP</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ssh <a href="mailto:admin@172.19.0.1" target="_blank" rel="noopener noreferrer">admin@172.19.0.1</a> -p puerto</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


