var documenterSearchIndex = {"docs":
[{"location":"basics/NonlinearProblem/#Nonlinear-Problems","page":"Nonlinear Problems","title":"Nonlinear Problems","text":"","category":"section"},{"location":"basics/NonlinearProblem/","page":"Nonlinear Problems","title":"Nonlinear Problems","text":"NonlinearProblem","category":"page"},{"location":"basics/NonlinearProblem/#SciMLBase.NonlinearProblem","page":"Nonlinear Problems","title":"SciMLBase.NonlinearProblem","text":"Defines a nonlinear system problem. Documentation Page: https://nonlinearsolve.sciml.ai/dev/basics/NonlinearProblem/\n\nMathematical Specification of a Nonlinear Problem\n\nTo define a Nonlinear Problem, you simply need to give the function f which defines the nonlinear system:\n\nf(up) = 0\n\nand an initial guess u₀ of where f(u,p)=0. f should be specified as f(u,p) (or in-place as f(du,u,p)), and u₀ should be an AbstractArray (or number) whose geometry matches the desired geometry of u. Note that we are not limited to numbers or vectors for u₀; one is allowed to provide u₀ as arbitrary matrices / higher-dimension tensors as well.\n\nProblem Type\n\nConstructors\n\nNonlinearProblem(f::NonlinearFunction,u0,p=NullParameters();kwargs...)\nNonlinearProblem{isinplace}(f,u0,p=NullParameters();kwargs...)\n\nisinplace optionally sets whether the function is in-place or not. This is determined automatically, but not inferred.\n\nParameters are optional, and if not given, then a NullParameters() singleton will be used, which will throw nice errors if you try to index non-existent parameters. Any extra keyword arguments are passed on to the solvers. For example, if you set a callback in the problem, then that callback will be added in every solve call.\n\nFor specifying Jacobians and mass matrices, see the NonlinearFunctions page.\n\nFields\n\nf: The function in the problem.\nu0: The initial guess for the steady state.\np: The parameters for the problem. Defaults to NullParameters.\nkwargs: The keyword arguments passed on to the solvers.\n\n\n\n","category":"type"},{"location":"solvers/NonlinearSystemSolvers/#nonlinearsystemsolvers","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"","category":"section"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"solve(prob::NonlinearProblem,alg;kwargs)","category":"page"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"Solves for f(u)=0 in the problem defined by prob using the algorithm alg. If no algorithm is given, a default algorithm will be chosen.","category":"page"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"This page is solely focused on the methods for nonlinear systems.","category":"page"},{"location":"solvers/NonlinearSystemSolvers/#Recommended-Methods","page":"Nonlinear System Solvers","title":"Recommended Methods","text":"","category":"section"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"NewtonRaphson is a good choice for most problems. It is non-allocating on static arrays and thus really well-optimized for small systems, while for large systems it can make use of sparsity patterns for sparse automatic differentiation and sparse linear solving of very large systems. That said, as a classic Newton method, its stability region can be smaller than other methods. NLSolveJL's :trust_region method can be a good choice for high stability, along with CMINPACK.","category":"page"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"For a system which is very non-stiff (i.e., the condition number of the Jacobian is small, or the eigenvalues of the Jacobian are within a few orders of magnitude), then NLSolveJL's :anderson can be a good choice.","category":"page"},{"location":"solvers/NonlinearSystemSolvers/#Full-List-of-Methods","page":"Nonlinear System Solvers","title":"Full List of Methods","text":"","category":"section"},{"location":"solvers/NonlinearSystemSolvers/#NonlinearSolve.jl","page":"Nonlinear System Solvers","title":"NonlinearSolve.jl","text":"","category":"section"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"These are the core solvers.","category":"page"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"NewtonRaphson(;autodiff=true,chunk_size=12,diff_type=Val{:forward},linsolve=DEFAULT_LINSOLVE): A Newton-Raphson method with swappable nonlinear solvers and autodiff methods for high performance on large and sparse systems. When used on objects like static arrays, this method is non-allocating.","category":"page"},{"location":"solvers/NonlinearSystemSolvers/#SciMLNLSolve.jl","page":"Nonlinear System Solvers","title":"SciMLNLSolve.jl","text":"","category":"section"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"This is a wrapper package for importing solvers from other packages into this interface. Note that these solvers do not come by default, and thus one needs to install the package before using these solvers:","category":"page"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"]add SciMLNLSolve\nusing SciMLNLSolve","category":"page"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"CMINPACK(): A wrapper for using the classic MINPACK method through MINPACK.jl\nNLSolveJL(): A wrapper for NLsolve.jl","category":"page"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"NLSolveJL(;\n          method=:trust_region,\n          autodiff=:central,\n          store_trace=false,\n          extended_trace=false,\n          linesearch=LineSearches.Static(),\n          linsolve=(x, A, b) -> copyto!(x, A\\b),\n          factor = one(Float64),\n          autoscale=true,\n          m=10,\n          beta=one(Float64),\n          show_trace=false,\n       )","category":"page"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"Choices for methods in NLSolveJL:","category":"page"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":":fixedpoint: Fixed-point iteration\n:anderson: Anderson-accelerated fixed-point iteration\n:newton: Classical Newton method with an optional line search\n:trust_region: Trust region Newton method (the default choice)","category":"page"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"For more information on these arguments, consult the NLsolve.jl documentation.","category":"page"},{"location":"solvers/NonlinearSystemSolvers/#Sundials.jl","page":"Nonlinear System Solvers","title":"Sundials.jl","text":"","category":"section"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"This is a wrapper package for the SUNDIALS C library, specifically the KINSOL nonlinear solver included in that ecosystem. Note that these solvers do not come by default, and thus one needs to install the package before using these solvers:","category":"page"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"]add Sundials\nusing Sundials","category":"page"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"KINSOL: The KINSOL method of the SUNDIALS C library","category":"page"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"KINSOL(;\n    linear_solver = :Dense,\n    jac_upper = 0,\n    jac_lower = 0,\n    userdata = nothing,\n)","category":"page"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":"The choices for the linear solver are:","category":"page"},{"location":"solvers/NonlinearSystemSolvers/","page":"Nonlinear System Solvers","title":"Nonlinear System Solvers","text":":Dense: A dense linear solver\n:Band: A solver specialized for banded Jacobians. If used, you must set the position of the upper and lower non-zero diagonals via jac_upper and jac_lower.\n:LapackDense: A version of the dense linear solver that uses the Julia-provided OpenBLAS-linked LAPACK for multithreaded operations. This will be faster than :Dense on larger systems but has noticeable overhead on smaller (<100 ODE) systems.\n:LapackBand: A version of the banded linear solver that uses the Julia-provided OpenBLAS-linked LAPACK for multithreaded operations. This will be faster than :Band on larger systems but has noticeable overhead on smaller (<100 ODE) systems.\n:Diagonal: This method is specialized for diagonal Jacobians.\n:GMRES: A GMRES method. Recommended first choice Krylov method.\n:BCG: A biconjugate gradient method\n:PCG: A preconditioned conjugate gradient method. Only for symmetric linear systems.\n:TFQMR: A TFQMR method.\n:KLU: A sparse factorization method. Requires that the user specify a Jacobian. The Jacobian must be set as a sparse matrix in the ODEProblem type.","category":"page"},{"location":"tutorials/nonlinear/#Solving-Nonlinear-Systems","page":"Solving Nonlinear Systems","title":"Solving Nonlinear Systems","text":"","category":"section"},{"location":"tutorials/nonlinear/","page":"Solving Nonlinear Systems","title":"Solving Nonlinear Systems","text":"A nonlinear system f(u) = 0 is specified by defining a function f(u,p), where p are the parameters of the system. For example, the following solves the vector equation f(u) = u^2 - p for a vector of equations:","category":"page"},{"location":"tutorials/nonlinear/","page":"Solving Nonlinear Systems","title":"Solving Nonlinear Systems","text":"using NonlinearSolve, StaticArrays\n\nf(u,p) = u .* u .- p\nu0 = @SVector[1.0, 1.0]\np = 2.0\nprobN = NonlinearProblem{false}(f, u0, p)\nsolver = solve(probN, NewtonRaphson(), tol = 1e-9)","category":"page"},{"location":"tutorials/nonlinear/","page":"Solving Nonlinear Systems","title":"Solving Nonlinear Systems","text":"where u0 is the initial condition for the rootfind. Native NonlinearSolve.jl solvers use the given type of u0 to determine the type used within the solver and the return. Note that the parameters p can be any type, but most are an AbstractArray for automatic differentiation.","category":"page"},{"location":"tutorials/nonlinear/#Using-Bracketing-Methods","page":"Solving Nonlinear Systems","title":"Using Bracketing Methods","text":"","category":"section"},{"location":"tutorials/nonlinear/","page":"Solving Nonlinear Systems","title":"Solving Nonlinear Systems","text":"For scalar rootfinding problems, bracketing methods exist. In this case, one passes a bracket instead of an initial condition, for example:","category":"page"},{"location":"tutorials/nonlinear/","page":"Solving Nonlinear Systems","title":"Solving Nonlinear Systems","text":"f(u, p) = u .* u .- 2.0\nu0 = (1.0, 2.0) # brackets\nprobB = NonlinearProblem(f, u0)\nsol = solve(probB, Falsi())","category":"page"},{"location":"tutorials/iterator_interface/#Nonlinear-Solver-Iterator-Interface","page":"Nonlinear Solver Iterator Interface","title":"Nonlinear Solver Iterator Interface","text":"","category":"section"},{"location":"tutorials/iterator_interface/","page":"Nonlinear Solver Iterator Interface","title":"Nonlinear Solver Iterator Interface","text":"There is an iterator form of the nonlinear solver which mirrors the DiffEq integrator interface:","category":"page"},{"location":"tutorials/iterator_interface/","page":"Nonlinear Solver Iterator Interface","title":"Nonlinear Solver Iterator Interface","text":"f(u, p) = u .* u .- 2.0\nu0 = (1.0, 2.0) # brackets\nprobB = NonlinearProblem(f, u0)\nsolver = init(probB, Falsi()) # Can iterate the solver object\nsolver = solve!(solver)","category":"page"},{"location":"tutorials/iterator_interface/","page":"Nonlinear Solver Iterator Interface","title":"Nonlinear Solver Iterator Interface","text":"Note that the solver object is actually immutable since we want to make it live on the stack for the sake of performance.","category":"page"},{"location":"basics/FAQ/#Frequently-Asked-Questions","page":"Frequently Asked Questions","title":"Frequently Asked Questions","text":"","category":"section"},{"location":"basics/FAQ/","page":"Frequently Asked Questions","title":"Frequently Asked Questions","text":"Ask more questions.","category":"page"},{"location":"#NonlinearSolve.jl:-High-Performance-Unified-Nonlinear-Solvers","page":"Home","title":"NonlinearSolve.jl: High-Performance Unified Nonlinear Solvers","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"NonlinearSolve.jl is a unified interface for the nonlinear solving packages of Julia. It includes its own high-performance nonlinear solvers which include the ability to swap out to fast direct and iterative linear solvers, along with the ability to use sparse automatic differentiation for Jacobian construction and Jacobian-vector products. It interfaces with other packages of the Julia ecosystem to make it easy to test alternative solver packages and pass small types to control algorithm swapping. It also interfaces with the ModelingToolkit.jl world of symbolic modeling to allow for automatically generating high-performance code.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Performance is key: the current methods are made to be highly performant on scalar and statically sized small problems, with options for large-scale systems. If you run into any performance issues, please file an issue. Note that this package is distinct from SciMLNLSolve.jl. Consult the NonlinearSystemSolvers page for information on how to import solvers from different packages.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To install NonlinearSolve.jl, use the Julia package manager:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg\nPkg.add(\"NonlinearSolve\")","category":"page"},{"location":"#Contributing","page":"Home","title":"Contributing","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Please refer to the SciML ColPrac: Contributor's Guide on Collaborative Practices for Community Packages for guidance on PRs, issues, and other matters relating to contributing to ModelingToolkit.\nThere are a few community forums:\nthe #diffeq-bridged channel in the Julia Slack\nJuliaDiffEq on Gitter\non the Julia Discourse forums (look for the modelingtoolkit tag\nsee also SciML Community page","category":"page"},{"location":"#Roadmap","page":"Home","title":"Roadmap","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The current algorithms should support automatic differentiation, though improved adjoint overloads are planned to be added in the current update (which will make use of the f(u,p) form). Future updates will include standard methods for larger scale nonlinear solving like Newton-Krylov methods.","category":"page"},{"location":"basics/NonlinearFunctions/#nonlinearfunctions","page":"NonlinearFunctions and Jacobian Types","title":"NonlinearFunctions and Jacobian Types","text":"","category":"section"},{"location":"basics/NonlinearFunctions/","page":"NonlinearFunctions and Jacobian Types","title":"NonlinearFunctions and Jacobian Types","text":"The SciML ecosystem provides an extensive interface for declaring extra functions associated with the differential equation's data. In traditional libraries there is usually only one option: the Jacobian. However, we allow for a large array of pre-computed functions to speed up the calculations. This is offered via the NonlinearFunction types, which can be passed to the problems.","category":"page"},{"location":"basics/NonlinearFunctions/#Function-Type-Definitions","page":"NonlinearFunctions and Jacobian Types","title":"Function Type Definitions","text":"","category":"section"},{"location":"basics/NonlinearFunctions/","page":"NonlinearFunctions and Jacobian Types","title":"NonlinearFunctions and Jacobian Types","text":"SciMLBase.NonlinearFunction","category":"page"},{"location":"basics/NonlinearFunctions/#SciMLBase.NonlinearFunction","page":"NonlinearFunctions and Jacobian Types","title":"SciMLBase.NonlinearFunction","text":"NonlinearFunction{iip,F,TMM,Ta,Tt,TJ,JVP,VJP,JP,SP,TW,TWt,TPJ,S,O,TCV} <: AbstractNonlinearFunction{iip}\n\nA representation of an nonlinear system of equations f, defined by:\n\n0 = f(up)\n\nand all of its related functions, such as the Jacobian of f, its gradient with respect to time, and more. For all cases, u0 is the initial condition, p are the parameters, and t is the independent variable.\n\nConstructor\n\nNonlinearFunction{iip,recompile}(f;\n                           analytic=nothing,\n                           jac=nothing,\n                           jvp=nothing,\n                           vjp=nothing,\n                           jac_prototype=nothing,\n                           sparsity=jac_prototype,\n                           paramjac = nothing,\n                           syms = nothing,\n                           indepsym = nothing,\n                           colorvec = nothing)\n\nNote that only the function f itself is required. This function should be given as f!(du,u,p) or du = f(u,p). See the section on iip for more details on in-place vs out-of-place handling.\n\nAll of the remaining functions are optional for improving or accelerating  the usage of f. These include:\n\nanalytic(u0,p): used to pass an analytical solution function for the analytical  solution of the ODE. Generally only used for testing and development of the solvers.\njac(J,u,p) or J=jac(u,p): returns fracdfdu\njvp(Jv,v,u,p) or Jv=jvp(v,u,p): returns the directional derivativefracdfdu v\nvjp(Jv,v,u,p) or Jv=vjp(v,u,p): returns the adjoint derivativefracdfdu^ast v\njac_prototype: a prototype matrix matching the type that matches the Jacobian. For example, if the Jacobian is tridiagonal, then an appropriately sized Tridiagonal matrix can be used as the prototype and integrators will specialize on this structure where possible. Non-structured sparsity patterns should use a SparseMatrixCSC with a correct sparsity pattern for the Jacobian. The default is nothing, which means a dense Jacobian.\nparamjac(pJ,u,p): returns the parameter Jacobian fracdfdp.\nsyms: the symbol names for the elements of the equation. This should match u0 in size. For example, if u0 = [0.0,1.0] and syms = [:x, :y], this will apply a canonical naming to the values, allowing sol[:x] in the solution and automatically naming values in plots.\nindepsym: the canonical naming for the independent variable. Defaults to nothing, which internally uses t as the representation in any plots.\ncolorvec: a color vector according to the SparseDiffTools.jl definition for the sparsity pattern of the jac_prototype. This specializes the Jacobian construction when using finite differences and automatic differentiation to be computed in an accelerated manner based on the sparsity pattern. Defaults to nothing, which means a color vector will be internally computed on demand when required. The cost of this operation is highly dependent on the sparsity pattern.\n\niip: In-Place vs Out-Of-Place\n\nFor more details on this argument, see the ODEFunction documentation.\n\nrecompile: Controlling Compilation and Specialization\n\nFor more details on this argument, see the ODEFunction documentation.\n\nFields\n\nThe fields of the NonlinearFunction type directly match the names of the inputs.\n\n\n\n","category":"type"},{"location":"solvers/BracketingSolvers/#Bracketing-Solvers","page":"Bracketing Solvers","title":"Bracketing Solvers","text":"","category":"section"},{"location":"solvers/BracketingSolvers/","page":"Bracketing Solvers","title":"Bracketing Solvers","text":"solve(prob::NonlinearProblem,alg;kwargs)","category":"page"},{"location":"solvers/BracketingSolvers/","page":"Bracketing Solvers","title":"Bracketing Solvers","text":"Solves for f(u)=0 in the problem defined by prob using the algorithm alg. If no algorithm is given, a default algorithm will be chosen.","category":"page"},{"location":"solvers/BracketingSolvers/","page":"Bracketing Solvers","title":"Bracketing Solvers","text":"This page is solely focused on the bracketing methods for scalar nonlinear equations.","category":"page"},{"location":"solvers/BracketingSolvers/#Recommended-Methods","page":"Bracketing Solvers","title":"Recommended Methods","text":"","category":"section"},{"location":"solvers/BracketingSolvers/","page":"Bracketing Solvers","title":"Bracketing Solvers","text":"Falsi() can have a faster convergence and is discretely differentiable, but is less stable than Bisection.","category":"page"},{"location":"solvers/BracketingSolvers/#Full-List-of-Methods","page":"Bracketing Solvers","title":"Full List of Methods","text":"","category":"section"},{"location":"solvers/BracketingSolvers/#NonlinearSolve.jl","page":"Bracketing Solvers","title":"NonlinearSolve.jl","text":"","category":"section"},{"location":"solvers/BracketingSolvers/","page":"Bracketing Solvers","title":"Bracketing Solvers","text":"Falsi: A non-allocating regula falsi method\nBisection: A common bisection method","category":"page"}]
}