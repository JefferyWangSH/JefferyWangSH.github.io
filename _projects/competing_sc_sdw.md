---
layout: page
title: Competing SC & SDW
description: Note for the multichannel BdG diagonalization.
img: assets/img/multichannel_bdg.svg
importance: 1
category: Notes
related_publications:
---

### Bosonic low-energy theory:

$$
\begin{align*}
\mathcal{S_B}[\Delta,\vec{\phi}] = \int_0^\beta\mathrm{d}\tau 
&\left[ \frac{1}{2c_\Delta^2} \sum_i |\partial_\tau\Delta_i|^2 
+ \frac{1}{2} \sum_{\langle ij\rangle} |\Delta_{j}-\Delta_i|^2 
+ \sum_i \left(\frac{r_\Delta}{2}|\Delta_i|^2 + \frac{u_\Delta}{4}|\Delta_i|^4 \right)\right]\\
+&\left[ \frac{1}{2c_\phi^2} \sum_i (\partial_\tau\vec{\phi}_i)^2 
+ \frac{1}{2} \sum_{\langle ij\rangle} (\vec{\phi}_{j}-\vec{\phi}_i)^2 
+ \sum_i \left(\frac{r_\phi}{2} \vec{\phi}_i^2 + \frac{u_\phi}{4}(\vec{\phi}_i^2)^2 \right)\right]\\
+& V \sum_i |\Delta_i|^2 \cdot \vec{\phi}_i^2
\end{align*}
$$

<br />

### Fermion bilinears coupling to fluctuating orders

* Local complex $$\Delta_i$$ with $$s$$-wave pairing, $$\Delta_i \in \mathbb{U}(1)$$;
* Easy-plane SDW order with $$Q=(\pi,\pi)$$, $$\vec{\phi_i} \in \mathbb{O}(2)$$, undergoing a BKT transition at finite temperature.

$$
\begin{align*}
H_F =& -t\sum_{\langle ij\rangle,\alpha} \left(c^\dagger_{i\alpha} c_{j\alpha} + h.c.\right)
+ g_{\phi} \sum_{i,\alpha\beta} e^{i\boldsymbol{Q}\cdot\boldsymbol{r_i}} \left(c^\dagger_{i\alpha}\vec{\sigma}_{\alpha\beta}c_{i\beta}\right) \cdot \vec{\phi_i}\\
&+ g_{\Delta} \sum_{i} \left(\Delta_i c^\dagger_{i\uparrow} c^\dagger_{i\downarrow} + h.c.\right)
\end{align*}
$$

<br />

### Integration over generic BdG fermion bilinears

#### Multichannel fermion bilinears[^1][^2][^3]

Consider a generic BdG Hamiltonian as

$$
H_{\text{BdG}} = \sum_{ij} A_{ij} c^\dagger_i c_j + \frac{1}{2} \sum_{ij} \left(B_{ij} c^\dagger_i c^\dagger_j + h.c.\right),
$$

where the label $$i$$ or $$j$$ includes both external (e.g. spacial sites) and internal (e.g. spin) degrees of freedom, and $$1\leq i,j\leq N$$.
The hermiticity of the Hamiltonian requires that $$A_{ij}=A_{ji}^\ast$$ ; and the anti-commute nature of fermions imposes that $$B_{ij}=-B_{ji}$$.
The factor $$\frac{1}{2}$$ implies that we have doubled the $$c^\dagger c^\dagger$$/$$cc$$ terms,

$$
B_{ij}c^\dagger_i c^\dagger_j + h.c. = \frac{1}{2}\left( B_{ij}c^\dagger_i c^\dagger_j - B_{ij} c^\dagger_j c^\dagger_i + B^\ast_{ij} c_j c_i - B^\ast_{ij} c_i c_j \right),
$$

which makes $$\boldsymbol{\hat{B}}$$ anti-symmtric, i.e. $$B_{ij}=-B_{ji}$$.

We construct the generalized Nambu spinor $$\Psi=(c_1, \cdots, c_N, c_1^\dagger, \cdots, c_N^\dagger )^T$$, and re-formulate $$H_\text{BdG}$$ as

$$
H_\text{BdG} = \frac{1}{2} \overline{\Psi} \boldsymbol{\hat{H}} \Psi + \frac{1}{2}\text{Tr} \boldsymbol{\hat{A}}
; \quad
\boldsymbol{\hat{H}} =
\begin{pmatrix}
\ {\boldsymbol{\hat{A}}}&{\boldsymbol{\hat{B}}}\ \\
\ {-\boldsymbol{\hat{B}^\ast}}&{-\boldsymbol{\hat{A}^\ast}}\ \\
\end{pmatrix}.
$$

The diagonal elements of $$\boldsymbol{\hat{H}}$$ can be read from doubling the $$c^\dagger c$$ terms, i.e.,

$$
A_{ij} c^\dagger_i c_j=\frac{1}{2} (A_{ij} c^\dagger_i c_j - A_{ij} c_j c^\dagger_i + A_{ii} \delta_{ij}) = \frac{1}{2} (A_{ij} c^\dagger_i c_j - A^\ast_{ji} c_j c^\dagger_i + A_{ii} \delta_{ij}).
$$

Note that the $$\boldsymbol{\hat{H}}$$ is Hermitian in the Numba representation. The construction above also manually results in a *'fictitious'* particle-hole symmetry $$\mathcal{C}$$, manifesting as a mathematical structrue in the BdG Hamiltonians, since we have doubly enlarged the Hilbert space by simple reuse of creation/annihilation operators. The particle-hole symmetry acts on the spinor as $$\mathcal{C} \Psi = \sigma_x \Psi^\ast$$, and acts on $$\boldsymbol{\hat{H}}$$ as $$\mathcal{C}\boldsymbol{\hat{H}} = \sigma_x \boldsymbol{\hat{H}}^\ast \sigma_x = -\boldsymbol{\hat{H}}$$. One can thus easily verify that the $$H_\text{BdG}$$ is invariant under $$\mathcal{C}$$.

<br />

#### Majorana representation

Since the Nambu spinor contains uncommuted operators, which can be related to its counterpart through a conjugation, integrating over the fermion bilinears in the Nambu representation does not lead to a fermion determinant. To get around of this drawback and prepare for the further application to numerical studies, we switch to the Majorana representation through the transformation

$$
c_i = \frac{1}{2}(\gamma^1_i+i\gamma^2_i); \quad c^\dagger_i = \frac{1}{2}(\gamma^1_i-i\gamma^2_i).
$$

It's straightforward to check that the usual anticommutation relation holds for Majorana fermions $$\{\gamma^m_i, \gamma^n_j\}=2\delta_{mn}\delta_{ij}$$, which implies $$\gamma^m_i\gamma^m_i=1$$. The inversed transformation follows as $$\gamma^1_i=c_i+c^\dagger_i$$ and $$\gamma^2_i=-i(c_i-c^\dagger_i)$$.
Then we introduce the Majorana spinor $$\gamma=(\gamma^1_1, \cdots, \gamma^1_N, \gamma^2_1, \cdots, \gamma^2_N)^T$$, which is related to the Nambu spinor via

$$
\gamma = 
\begin{pmatrix}
\ {\mathbb{I}}&{\mathbb{I}}\ \\
\ {-i\mathbb{I}}&{i\mathbb{I}}\ \\
\end{pmatrix}
\Psi;
\quad
\Psi = \frac{1}{2}
\begin{pmatrix}
\ {\mathbb{I}}&{i\mathbb{I}}\ \\
\ {\mathbb{I}}&{-i\mathbb{I}}\ \\
\end{pmatrix}
\gamma.
$$

Under this basis transformation, we can formulate the $$H_\text{BdG}$$ in the Majorana representation,

$$
H_\text{BdG} = \frac{1}{2} \overline{\gamma} \boldsymbol{\hat{h}} \gamma + \frac{1}{2}\text{Tr}\boldsymbol{\hat{A}};
\quad
\boldsymbol{\hat{h}} = \frac{i}{2}
\begin{pmatrix}
\ {\text{Im}\boldsymbol{\hat{A}}+\text{Im}\boldsymbol{\hat{B}}}&{\text{Re}\boldsymbol{\hat{A}}-\text{Re}\boldsymbol{\hat{B}}}\ \\
\ {-\text{Re}\boldsymbol{\hat{A}}-\text{Re}\boldsymbol{\hat{B}}}&{\text{Im}\boldsymbol{\hat{A}}-\text{Im}\boldsymbol{\hat{B}}}\ \\
\end{pmatrix}.
$$

The hermiticity of $$H_\text{BdG}$$ requires that $$\boldsymbol{\hat{h}}$$ is anti-symmetric and purely complex. This can be proved by noting $$\boldsymbol{\hat{A}}^H=\boldsymbol{\hat{A}}$$ and $$\boldsymbol{\hat{B}}=-\boldsymbol{\hat{B}}^T$$.

<br />

#### Trace over Majorana fermions and the Green's function

We now show some facts about the trace over exponentials of the Majorana fermion bilinears, which can be typically expressed as a square root of determinant.[^4] Suppose $$\hat{h} = \frac{1}{4} \sum_{ij} \gamma_i h_{ij} \gamma_j$$ where $$h_{ij}=-h_{ji}$$, the trace $$\text{Tr}[e^{-\Delta\tau\hat{h}}]$$ takes a nice form,

$$
\text{Tr}\left[e^{-\Delta\tau\hat{h}}\right] = \text{Tr}\left[e^{-\Delta\tau\frac{1}{4}\overline{\gamma}h\gamma}\right]
= \left[\text{det}\left(\mathbb{I}+e^{-\Delta\tau h}\right)\right]^{\frac{1}{2}},
$$

and for products of Majorana fermion bilinear exponentials, a generalized result holds

$$
\text{Tr}\left[\prod_n e^{-\Delta\tau h(n)}\right] = \left\{\text{det}\left[\mathbb{I}+\prod_n e^{-\Delta\tau h(n)}\right]\right\}^{\frac{1}{2}}.
$$

Compared with the standard results for complex fermions, the square root of the determinant reflects that the Majorana fermion s carry only half of the degrees of freedom of usual complex fermions.

The Green's function is the essential quantity in the *MQMC* framework. For given configuration $$\{\sigma\}$$ of the auxiliary fields, the (equal-time) Majorana Green's function is defined as

$$
G_{i,j}^{a,b} = \left\langle \gamma_i^m \gamma_j^n \right\rangle_{\sigma} = \frac{1}{2} \left[ \mathbb{I} + \prod_{\color{red}n=N_\tau}^{\color{red}1} e^{-\Delta\tau h(n)} \right]^{-1}_{\color{red}jb,ia}
$$

where $$a/b$$ labels the type of Majorana fermions, and some distinct differneces compared with the Green's function in DQMC are noted in red. <span style="color:red"> *( maybe caused by the anti-symmtric property of $$h(n)$$, need double check. )*</span> The usual Green's function $$\langle c_i c^\dagger_j \rangle$$ of complex fermions, and other physical observables, can be easily obtained from $$G_{i,j}^{a,b}$$ via the Wick's theorem.

<br />

#### Example: Fermion bilinears coupling to the fluctuating SC and SDW.

Let's bring back the spin labels, and rewrite the $H_F$ into the generalized BdG form as

$$
\begin{align*}
H_F &=-t\sum_{\langle ij\rangle,\alpha} \left(c^\dagger_{i\alpha} c_{j\alpha} + h.c.\right) + g_{\phi} \sum_{i,\alpha\beta} \left[e^{i\boldsymbol{Q}\cdot\boldsymbol{r_i}} \left(c^\dagger_{i\alpha}\vec{\sigma}_{\alpha\beta}c_{i\beta}\right) \cdot \vec{\phi_i} + h.c. \right] + g_{\Delta} \sum_{i} \left(\Delta_i c^\dagger_{i\uparrow} c^\dagger_{i\downarrow} + h.c.\right),\\
&\equiv \sum_{i\alpha,j\beta} A_{i\alpha,j\beta} c^\dagger_{i\alpha} c_{j\beta} + \frac{1}{2} \sum_{i\alpha, j\beta} \left(B_{i\alpha,j\beta} c^\dagger_{i\alpha} c^\dagger_{j\beta} + h.c.\right),
\end{align*}
$$

where $$A_{i\alpha,j\beta}=-t \delta_{\langle ij\rangle} \delta_{\alpha\beta} + 2g_\phi\ \cos(\boldsymbol{Q}\cdot\boldsymbol{r_i}) \ (\vec{\sigma}_{\alpha\beta}\cdot\vec{\phi_i})\ \delta_{ij}$$ and $$B_{i\alpha,j\beta}=(-1)^{\alpha} g_\Delta \Delta_i \delta_{ij} \delta_{\alpha\overline{\beta}}$$. The factor $$(-1)^\alpha$$ automatically satisfies the anti-symmetric requirement of matrix $$B$$, by assuming that $$\alpha/\beta=0$$ for spin-up and 1 for spin-down.

<br />

### References
[^1]: 任杰, Bogoliubov 变换与 Majorana 表示, [https://zhuanlan.zhihu.com/p/59445571](https://zhuanlan.zhihu.com/p/59445571).
[^2]: E. Lieb, T. Schultz and D. Mattis, [Annals of Physics, **16**, 3, 407-466](https://doi.org/10.1016/0003-4916(61)90115-4), 1961.
[^3]: M. V. Regemortel, D. Sels, and M. Wouters, [Phys. Rev. A **93**, 032311](https://journals.aps.org/pra/abstract/10.1103/PhysRevA.93.032311), 2016.
[^4]: Z.-X. Li, Y.-F. Jiang, and H. Yao, [Phys. Rev. B **91**, 241117(R)](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.91.241117), 2015.